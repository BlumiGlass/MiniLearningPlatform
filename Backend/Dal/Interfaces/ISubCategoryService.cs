using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Interfaces;

public interface ISubCategoryService:ICrud<SubCategory>
{
    List<SubCategory> ReadByCategoryId(int categoryId);
}
