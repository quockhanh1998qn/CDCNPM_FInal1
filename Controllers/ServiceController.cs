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
    public class ServiceController : ControllerBase
    {
        private KaraokeContext db;
        public ServiceController(KaraokeContext context)
        {
            this.db = context;

        }
        // GET api/Service
        [HttpGet]
        public ActionResult<IEnumerable<Service>> GetAll()
        {
            return db.Services;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Service> Get(string id)
        {
            return db.Services.Where(service => service.ServiceID.Equals(id)).FirstOrDefault<Service>();
        }

        // POST api/values
        [HttpPost]
        public bool Post(Service service)
        {
            try
            {
                db.Services.Add(service);
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
        public bool Put(Service service)
        {
            try
            {
                Service rel = db.Services.Find(service.ServiceID);
                db.Entry(rel).CurrentValues.SetValues(service);
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
        public bool Delete(Service service)
        {
            try
            {
                db.Services.Remove(service);
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