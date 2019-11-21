using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CDCNPM_FInal.Models
{
    public class Invoice
    {

        [Key]
        public string InvoiceID { get; set; }

        public string BookingID { get; set; }

        [DataType(DataType.Date)]
        public DateTime Invoice_Date { get; set; }

        public double Invoice_Total { get; set; }

        public string User { get; set; }
        [ForeignKey("BookingID")]
        public Booking Booking { get; set; }


    }
}
