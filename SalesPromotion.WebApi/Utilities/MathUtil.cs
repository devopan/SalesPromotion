using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesPromotion.WebApi.Utilities
{
    public static class MathUtil
    {
        public static int ConvertToHexInt(string code)
        {
            string hexResult = "";
            char[] values = code.ToCharArray();
            foreach (char letter in values)
            {
                int value = Convert.ToInt32(letter);
                string hexOutput = String.Format("{0:X}", value);
                hexResult += hexOutput;
            }

            string rs2 = hexResult;

            int checkInt = (int)(double.Parse(hexResult) / 65353.00);

            return checkInt;
        }

        public static bool IsPrime(int num)
        {
            int factor = num / 2;
            
            int i = 0;
            
            for (i = 2; i <= factor; i++)
            {
                if ((num % i) == 0)
                    return false;
            }

            return true;
        }        
    }
}