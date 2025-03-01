using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TenantManagementAPI.Models
{
   public class Client
    {
        public int ClientId { get; set; }
        public string Name { get; set; }
        public int OrganizationId { get; set; }

        [JsonIgnore] 
        public Organization Organization { get; set; }

        public ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}