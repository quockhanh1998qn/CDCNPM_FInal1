using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CDCNPM_Final.Data;
using CDCNPM_Final.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CDCNPM_FInal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
 
    public class RoomController : ControllerBase
    {
        private KaraokeContext db;
        public RoomController(KaraokeContext context)
        {
            this.db = context;

        }
        // GET api/room
        [HttpGet]
        public ActionResult<IEnumerable<Room>> GetAll()
        {
            return db.Rooms;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Room> Get(int id)
        {
            return db.Rooms.Where(room => room.RoomID == id).FirstOrDefault<Room>();
        }

        [HttpGet("GetFloor/{floor}")]
        public List<Room> GetByFloor(int floor)
        {
            return db.Rooms.Where(room => room.Floor == floor).ToList<Room>();
        }

        // POST api/values
        [HttpPost]
        public bool Post(Room room)
        {
            try
            {
                db.Rooms.Add(room);
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
        public bool Put(Room room)
        {
            try
            {
                Room rel = db.Rooms.Find(room.RoomID);
                db.Entry(rel).CurrentValues.SetValues(room);
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
        public bool Delete(Room room)
        {
            try
            {
                db.Rooms.Remove(room);
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
