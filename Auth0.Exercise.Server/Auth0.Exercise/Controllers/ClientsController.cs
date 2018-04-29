using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Auth0.ManagementApi;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Auth0.Exercise.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace Auth0.Exercise.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Clients")]
    public class ClientsController : Controller
    {
        public IConfiguration configuration;
        private readonly ManagementApiClient client;

        public ClientsController(IConfiguration _configuration)
        {
            this.configuration = _configuration;
            client = new ManagementApiClient(this.configuration["auth:token"], this.configuration["auth:domain"]);


        }
        // GET: api/Clients
        [HttpGet]
        public async Task<IActionResult> Get(SearchModel param)
        {
            var clients = await this.client.Clients.GetAllAsync();
            if (clients.Count > 0)
            {
                var data = clients.AsQueryable();
                if (!string.IsNullOrEmpty(param.searchQuery))
                {
                    var queryString = param.searchQuery.Trim().ToLowerInvariant();
                    data = data.Where(c => c.Name.ToLowerInvariant().Contains(queryString) || c.ClientId.ToLowerInvariant().Contains(queryString)).OrderBy(o => o.Name);
                }

                return Ok(data);
            }
            return NoContent();
        }

        // GET: api/Clients/5
        [HttpGet("{id}", Name = "GetRulesByClient")]
        public async Task<IActionResult> Get(string id)
        {
            if (id == "")
            {
                return BadRequest();
            }
            List<Model.Rule> appRule = new List<Model.Rule>();
            var rules = await this.client.Rules.GetAllAsync();
            if (rules.Count > 0)
            {
                foreach (var item in rules)
                {
                    if (item.Script.IndexOf(id) > 0)
                    {
                        appRule.Add(
                            new Model.Rule
                            {
                                Id = item.Id,
                                Name = item.Name,
                                Order = item.Order,
                                Script = item.Script,
                                Enabled = item.Enabled,
                                Stage = item.Stage
                            });
                    }
                }
                return Ok(appRule);

            }
            return NoContent();

        }
    }
}
