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
    public class InvoiceController : ControllerBase
    {
        private KaraokeContext db;
        public InvoiceController(KaraokeContext context)
        {
            this.db = context;

        }

        // GET api/room
        [HttpGet]
        public ActionResult<IEnumerable<Invoice>> GetAll()
        {
            return db.Invoices;
        }

        [HttpGet("{bookingID}")]
        public ActionResult<Invoice> Get(string bookingID)
        {
            return db.Invoices.Where(a => a.BookingID == bookingID).FirstOrDefault<Invoice>();
        }

        // POST api/values
        [HttpPost]
        public bool Post(Invoice invoice)
        {
            try
            {
                db.Invoices.Add(invoice);
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
        public bool Put(Invoice invoice)
        {
            try
            {
                Invoice rel = db.Invoices.Find(invoice.InvoiceID);
                db.Entry(rel).CurrentValues.SetValues(invoice);
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
        public bool Delete(Invoice invoice)
        {
            try
            {
                db.Invoices.Remove(invoice);
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