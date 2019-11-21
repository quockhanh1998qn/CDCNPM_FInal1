using CDCNPM_Final.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CDCNPM_FInal.Models
{
    public class Booking
    {
        public Booking(string bookingID, string cusName, string cusPhone, DateTime startTime, DateTime endTime, double preMoney, double total, string status, DateTime date, string username, int? roomID )
        {
            BookingID = bookingID;
            CusName = cusName;
            CusPhone = cusPhone;
            StartTime = startTime;
            EndTime = endTime;
            PreMoney = preMoney;
            Total = total;
            Status = status;
            Date = date;
            Username = username;
            RoomID = roomID;
           
        }
        [Key]
        public string BookingID { get; set; }

        public string CusName { get; set; }

        public string CusPhone { get; set; }

        [DataType(DataType.Time)]
        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public double PreMoney { get; set; }

        public double Total { get; set; }

        public string Status { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        public string Username { get; set; }
        public int? RoomID { get; set; }

        [ForeignKey("RoomID")]
        public virtual Room Room { get; set; }
        public virtual Invoice Invoice { get; set; }

        public virtual ICollection<DetailService> DetailServices { get; set; }


    }
}
