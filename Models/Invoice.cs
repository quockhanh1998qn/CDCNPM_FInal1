using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CDCNPM_FInal.Models
{
    public class Invoice
    {

        [Key]
        public string BookingID { get; set; }

        public DateTime Invoice_Date { get; set; }

        public double Invoice_Total { get; set; }

        public string User { get; set; }
        public Booking Booking { get; set; }


    }
}
