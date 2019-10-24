using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CDCNPM_FInal.Models
{
    public class DetailService
    {
        [Key]
        public string BookingID { get; set; }
        public string ServiceID { get; set; }
        public Booking Booking { get; set; }
        public Service Service { get; set; }
    }
}
