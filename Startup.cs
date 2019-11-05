using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CDCNPM_Final.Data;
using CDCNPM_FInal.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;
using System.Text;
using CDCNPM_FInal.Services;
using CDCNPM_FInal.Helpers;

namespace CDCNPM_Final
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddDbContext<KaraokeContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))); 
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddMvc().
                AddJsonOptions(options =>
                options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services.AddScoped<IUserService, UserService>();

            //services.AddIdentity<AppUser, AppRole>()
              //  .AddEntityFrameworkStores<KaraokeContext>()
                //.AddDefaultTokenProviders();

              //services.AddScoped<SignInManager<AppUser>, SignInManager<AppUser>>();
            //services.AddScoped<UserManager<AppUser>, UserManager<AppUser>>();
            //services.AddScoped<RoleManager<AppRole>, RoleManager<AppRole>>();

            // Configure Identity
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;

                // User settings
                options.User.RequireUniqueEmail = true;
            });
            //Config authen
            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddSwaggerGen(s =>
            {
                s.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "CDCNPM_Final",
                    Description = "API Swagger surface",
                    Contact = new Contact { Name = "QuocKhanh", Email = "dinhquockhanh1998@gmail.com", Url = "https://www.facebook.com/nguyendinhquoc.khanh.5" },
                    License = new License { Name = "dinhquockhanh1998", Url = "https://github.com/quockhanh1998qn/CDCNPM_Final" }
                });
            });
          

            services.Configure<IISServerOptions>(options =>
            {
                options.AutomaticAuthentication = false;
            });
            services.Configure<IISOptions>(options =>
            {
                options.ForwardClientCertificate = false;
            });
            services.AddAuthentication(IISServerDefaults.AuthenticationScheme);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(x => x
                 .AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader());


            app.UseHttpsRedirection();
            app.UseStaticFiles();
          
            app.UseSwagger();
            app.UseSwaggerUI(s =>
            {
                s.SwaggerEndpoint("/swagger/v1/swagger.json", "Project API v1.1");
            });

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
         
        }
    }
}
