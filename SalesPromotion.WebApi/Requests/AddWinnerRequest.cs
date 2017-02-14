using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesPromotion.WebApi.Requests
{
    public class AddWinnerRequest
    {
        public string FullName { get; set; }
        public string Address { get; set; }
        public int TelephoneNumber { get; set; }
    }
}