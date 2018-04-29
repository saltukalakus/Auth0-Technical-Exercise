using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth0.Exercise.Model
{
    public class Rule
    {
        public string Name { get; set; }
        public string Id { get; set; }
        public bool? Enabled { get; set; }
        public string Script { get; set; }
        public int? Order { get; set; }
        public string Stage { get; set; }
    }
}
