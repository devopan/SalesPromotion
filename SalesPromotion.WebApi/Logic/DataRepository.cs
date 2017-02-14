using SalesPromotion.WebApi.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SalesPromotion.WebApi.DataContext;
using System.Threading.Tasks;

namespace SalesPromotion.WebApi.Logic
{
    public class DataRepository
    {
        public bool InsertNewWinner(AddWinnerRequest winner)
        {
            bool success = false;

            try
            {
                using (var db = new LocalDBEntities())
                {
                    Winner newWinner = db.Winner.Create();
                    newWinner.Id = db.Winner.OrderByDescending(n => n.Id).FirstOrDefault() != null ? db.Winner.OrderByDescending(n => n.Id).FirstOrDefault().Id + 1 : 1;
                    newWinner.FullName = winner.FullName;
                    newWinner.Address = winner.Address;
                    newWinner.TelephoneNumber = winner.TelephoneNumber;

                    db.Winner.Add(newWinner);

                    db.SaveChanges();
                    
                }

                success = true;
            }
            catch (Exception ex)
            {
                // do error logging
                //string exc = ex.ToString();
            }

            return success;
            
        }

        public async Task<bool> ChangeThresholdAsync(int globalValue)
        {
            bool success = false;

            int changes = 0;

            try
            {
                using (var db = new LocalDBEntities())
                {
                    Global newGlobal = db.Global.FirstOrDefault(n => n.Name.Equals("Threshold"));
                    newGlobal.Value = globalValue.ToString();

                    if (db.ChangeTracker.HasChanges())
                    {
                        changes = await db.SaveChangesAsync();
                    }
                    else
                    {
                        changes = 1;
                    }
                }
            }
            catch (Exception ex)
            {
                // do error logging
                //string exc = ex.ToString();
            }

            if (changes > 0)
            {
                success = true;
            }

            return success;
        }

        public int GetThreshold()
        {
            int threshold = -1;

            try
            {
                using (var db = new LocalDBEntities())
                {
                    Global global = db.Global.FirstOrDefault(n => n.Name.Equals("Threshold"));
                    Int32.TryParse(global.Value, out threshold);
                }
            }
            catch (Exception ex)
            {
                // do error logging
                //string exc = ex.ToString();
            }

            return threshold;
        }
    }
}