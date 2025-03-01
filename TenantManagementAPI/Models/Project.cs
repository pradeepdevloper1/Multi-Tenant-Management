using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TenantManagementAPI.Models
{
    public class Project
    {

        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ClientId { get; set; }

        [JsonIgnore] // Exclude from serialization
        public Client Client { get; set; }

    }
}