using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CDCNPM_Final.Data;
using CDCNPM_FInal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CDCNPM_FInal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private KaraokeContext db;
        public BookingController(KaraokeContext context)
        {
            this.db = context;

        }
        // GET api/Service
        [HttpGet]
        public ActionResult<IEnumerable<Booking>> GetAll()
        {
            return db.Bookings;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Booking> Get(string id)
        {
            return db.Bookings.Where(booking => booking.BookingID.Equals(id)).FirstOrDefault<Booking>();
        }

        [HttpGet("GetRoomID/{roomID}")]
        public List<Booking> GetByRoomID(int roomID)
        {
            return db.Bookings.Where(booking => booking.RoomID.Equals(roomID)).ToList<Booking>();
        }


        // POST api/values
        [HttpPost]
        public bool Post(Booking booking)
        {
            try
            {
                db.Bookings.Add(booking);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // PUT api/values/5
        [HttpPut]
        public bool Put(Booking booking)
        {
            try
            {
                Booking rel = db.Bookings.Find(booking.BookingID);
                db.Entry(rel).CurrentValues.SetValues(booking);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // DELETE api/values/5
        [HttpDelete]
        public bool Delete(Booking booking)
        {
            try
            {
                db.Bookings.Remove(booking);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}