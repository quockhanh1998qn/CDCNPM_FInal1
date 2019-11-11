using CDCNPM_FInal.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CDCNPM_Final.Models
{
    public class Room
    {

        public Room(int roomID, string name, string type, double price, string status, int floor)
        {
            RoomID = roomID;
            Name = name;
            Type = type;
            Price = price;
            Status = status;
            Floor = floor;
        }

        [Key]
       public int RoomID { get; set; }

       public string Name { get; set; }

       public string Type { get; set; }

       public double Price { get; set; }

       public string Status { get; set; }

       public int Floor { get; set; }
    }
}
