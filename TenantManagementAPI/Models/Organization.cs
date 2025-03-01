using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace TenantManagementAPI.Models
{
    public class Organization
    {
        public int OrganizationId { get; set; }
        public string Name { get; set; }
        public List<Client> Clients { get; set; } = new List<Client>();
    }
}