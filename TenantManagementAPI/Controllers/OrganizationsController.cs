using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TenantManagementAPI.Data;
using TenantManagementAPI.Models;

namespace TenantManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrganizationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Organization>>> GetOrganizations()
        {
            var organizations = await _context.Organizations
                .Include(o => o.Clients)
                .ThenInclude(c => c.Projects)
                .Select(o => new Organization
                {
                    OrganizationId = o.OrganizationId,
                    Name = o.Name,
                    Clients = o.Clients.Select(c => new Client
                    {
                        ClientId = c.ClientId,
                        Name = c.Name,
                        Projects = c.Projects.Select(p => new Project
                        {
                            ProjectId = p.ProjectId,
                            Name = p.Name,
                            Description = p.Description,
                            ClientId = p.ClientId
                        }).ToList()
                    }).ToList()
                })
                .ToListAsync();

            return organizations;
        }

        // GET: api/Organizations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Organization>> GetOrganization(int id)
        {
            var organization = await _context.Organizations
                .Include(o => o.Clients)
                .FirstOrDefaultAsync(o => o.OrganizationId == id);

            if (organization == null)
            {
                return NotFound();
            }

            return organization;
        }

        // POST: api/Organizations
        [HttpPost]
        public async Task<ActionResult<Organization>> CreateOrganization(Organization organization)
        {
            _context.Organizations.Add(organization);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrganization), new { id = organization.OrganizationId }, organization);
        }
    }

}