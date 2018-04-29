using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auth0.ManagementApi.Models;

namespace Auth0.Exercise.Model
{
    public class Client
    {
        public string tenant { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public List<string> callbacks { get; set; }
        public bool global { get; set; }
        public List<string> allowed_clients { get; set; }
        public List<string> allowed_logout_urls { get; set; }
        public string app_type { get; set; }
        public List<string> web_origins { get; set; }
        public string is_first_party { get; set; }
        public bool oidc_conformant { get; set; }
        public bool is_token_endpoint_ip_header_trusted { get; set; }
        public bool sso_disabled { get; set; }
        public bool sso { get; set; }
        public bool cross_origin_auth { get; set; }
        public List<SigningKey> signing_keys { get; set; }
        public List<string> allowed_origins { get; set; }
        public string client_id { get; set; }
        public string callback_url_template { get; set; }
        public string config_route { get; set; }
        public string client_secret { get; set; }
        public List<JWTConfig> jwt_configuration { get; set; }
        public List<string> grant_types { get; set; }
        public bool custom_login_page_on { get; set; }

        public static explicit operator Client(Task<IList<ManagementApi.Models.Client>> v)
        {
            throw new NotImplementedException();
        }
    }
    public class SigningKey
    {
        public string cert { get; set; }
        public string pkcs7 { get; set; }
        public string subject { get; set; }
    }

    public class JWTConfig
    {
        public string alg { get; set; }
        public string lifetime_in_seconds { get; set; }
        public string secret_encoded { get; set; }
    }

}
