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
    public class DetailServiceController : ControllerBase
    {
        private KaraokeContext db;
        public DetailServiceController(KaraokeContext context)
        {
            this.db = context;

        }


        [HttpGet("{bookingID}")]
        public List<DetailService> Get(string bookingID)
        {
            return db.DetailServices.Where(a => a.BookingID == bookingID).ToList<DetailService>();
        }

        [HttpGet("GetQuantity")]
        public ActionResult<DetailService> GetQuantity(string bookingID, string serviceID)
        {
            return db.DetailServices.Where(a => a.BookingID == bookingID && a.ServiceID == serviceID).FirstOrDefault<DetailService>();
        }

        [HttpPost]
        public bool Post(DetailService detail)
        {
            try
            {
                db.DetailServices.Add(detail);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpPut]
        public bool Put(DetailService detail)
        {
            try
            {
                var _detail = db.DetailServices.Where(a => a.BookingID == detail.BookingID && a.ServiceID == detail.ServiceID).FirstOrDefault<DetailService>();
                if (_detail != null)
                {
                    _detail.BookingID = detail.BookingID;
                    _detail.ServiceID = detail.ServiceID;
                    _detail.Quantity = detail.Quantity;
                    _detail.Total = detail.Total;

                    db.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
              
         
            }
            catch
            {
                return false;
            }
        }
    }
}