using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CDCNPM_FInal.Models
{
    public class Service
    {
        public Service(string serviceID, string name, double price, string unit)
        {
            ServiceID = serviceID;
            Name = name;
            Price = price;
            Unit = unit;
        }
        [Key]
        public string ServiceID { get; set; }

        public string Name { get; set; }
        public string Type { get; set; }

        public double Price { get; set; }

        public string Unit { get; set; }
        public virtual ICollection<DetailService> DetailServices { get; set; }
    }
}
