using CDCNPM_Final.Data;
using CDCNPM_Final.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDCNPM_FInal.Data
{
    public class RoomDAO
    {
        private KaraokeContext db;
        public RoomDAO(KaraokeContext context)
        {
            this.db = context;
        }

        public bool AddRoom(Room room)
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

        // assume that the 'room' object is previously retrived from database via RoomContext
        public bool UpdateRoom(Room room)
        {
            try
            {
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteRoom(Room room)
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

        public IEnumerable<Room> GetAllRooms()
        {
            return db.Rooms; // this is lazy loading. The data is only loaded when we loop over it
        }

        // get all Rooms by cpu name
        public List<Room> GetRoomByType(String type)
        {
            return db.Rooms.Where(l => l.Type == type).ToList<Room>();
        }

        public int GetRoomCount()
        {
            return (from room in db.Rooms
                    select room).Count();
        }
    }
}

