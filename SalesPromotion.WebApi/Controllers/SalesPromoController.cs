using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SalesPromotion.WebApi.Utilities;
using SalesPromotion.WebApi.Logic;
using SalesPromotion.WebApi.Requests;
using SalesPromotion.WebApi.Responses;
using System.Web.Http.Cors;

namespace SalesPromotion.WebApi.Controllers
{
    public class SalesPromoController : ApiController
    {
        [HttpPost]
        public CheckCodeResponse CheckCode(CheckCodeRequest check)
        {
            CheckCodeResponse response = new CheckCodeResponse();
            HttpResponseMessage resp = new HttpResponseMessage();
            DataRepository repo = new DataRepository();
            int checkInt = MathUtil.ConvertToHexInt(check.Code);
            int threshold = repo.GetThreshold();
            Random rnd = new Random();

            if (threshold < 0)
            {
                response.result = false;
            }
            if (threshold == 0)
            {
                response.result = true;
            }
            else if (MathUtil.IsPrime(checkInt) && threshold == 9)
            {
                response.result = true;
            }
            else if (MathUtil.IsPrime(checkInt))
            {
                if (threshold >= rnd.Next(1, 9))
                {
                    response.result = true;
                }
                else
                {
                    response.result = false;
                }
            }
            else
            {
                response.result = false;
            }

            return response;
        }

        [HttpPost]
        public bool AddWinner(AddWinnerRequest winner)
        {
            DataRepository repo = new DataRepository();

            return repo.InsertNewWinner(winner);
        }
    }
}