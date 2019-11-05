using CDCNPM_Final.Models;
using CDCNPM_FInal.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDCNPM_Final.Data
{
    public class DbInitializer
    {
        private readonly KaraokeContext _context;
        private UserManager<AppUser> _userManager;
        private RoleManager<AppRole> _roleManager;
        public DbInitializer(KaraokeContext context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public async Task Seed()
        {
            if (!_roleManager.Roles.Any())
            {
                await _roleManager.CreateAsync(new AppRole()
                {
                    Name = "Admin",
                    NormalizedName = "Admin",
                    Description = "Top manager"
                });
                await _roleManager.CreateAsync(new AppRole()
                {
                    Name = "Staff",
                    NormalizedName = "Staff",
                    Description = "Staff"
                });
                await _roleManager.CreateAsync(new AppRole()
                {
                    Name = "Accountant",
                    NormalizedName = "Accountant",
                    Description = "Accountant"
                });
            }
            if (!_userManager.Users.Any())
            {
                await _userManager.CreateAsync(new AppUser()
                {
                    UserName = "admin",
                    FullName = "Administrator",
                    Email = "dinhquockhanh@gmail.com",
                    Balance = 0,
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    Status = "1"
                }, "123654$");
                var user = await _userManager.FindByNameAsync("admin");
                await _userManager.AddToRoleAsync(user, "Admin");
            }
            await _context.SaveChangesAsync();
        }
        }
}
