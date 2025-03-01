
using Microsoft.EntityFrameworkCore;
using TenantManagementAPI.Models;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
namespace TenantManagementAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {


            try
            {
                var databasecreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;
                if (databasecreator != null)
                {
                    if (!databasecreator.CanConnect()) databasecreator.Create();
                    if (!databasecreator.HasTables()) databasecreator.CreateTables();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

       
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the relationship between Client and Organization
            modelBuilder.Entity<Client>()
                .HasOne(c => c.Organization) // Navigation property in Client
                .WithMany(o => o.Clients)   // Navigation property in Organization
                .HasForeignKey(c => c.OrganizationId); // Foreign key property in Client

            // Configure the relationship between Project and Client
            modelBuilder.Entity<Project>()
                .HasOne(p => p.Client)      // Navigation property in Project
                .WithMany(c => c.Projects)  // Navigation property in Client
                .HasForeignKey(p => p.ClientId); // Foreign key property in Project
        }
    }
}