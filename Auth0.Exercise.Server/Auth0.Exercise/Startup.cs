using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;

namespace Auth0.Exercise
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
            services.AddMvc();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.Authority = Configuration["auth:authority"];
                options.Audience = Configuration["auth:audience"];
            });

            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("AllowSpecificOrigin"));
            });
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins(Configuration["Client:url"]).AllowAnyHeader()
                    .AllowAnyMethod());
            });

           
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "Digital Medical Passport",
                    Version = "v1",
                    Description = "Auth0 Tecnical Exercise  API endpoint Documentation",
                    Contact = new Contact { Name = "Tanver Hasan", Email = "t.h.noman@outlook.com" }
                });
                //var basePath = AppContext.BaseDirectory;
                //var xmlPath = System.IO.Path.Combine(basePath, "Auth0.Exercise.xml");
                //c.IncludeXmlComments(xmlPath);
            });


            services.AddSingleton<IConfiguration>(Configuration);
           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            // Shows UseCors with named policy.
            app.UseCors("AllowSpecificOrigin");
            app.UseStaticFiles();

            // 2. Enable authentication middleware
            app.UseAuthentication();
           
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseMvcWithDefaultRoute();
        }
    }
}
