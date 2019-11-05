using CDCNPM_Final.Models;
using CDCNPM_FInal.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDCNPM_Final.Data
{
    public class KaraokeContext : DbContext
    {
        public KaraokeContext()
        {
        }

        public KaraokeContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Booking> Bookings{ get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<DetailService> DetailServices { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        //public DbSet<AppUser> AppUsers { get; set; }
        //public DbSet<AppRole> AppRoles { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
