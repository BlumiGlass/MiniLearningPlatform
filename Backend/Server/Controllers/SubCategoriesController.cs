using Bl.Interfaces;
using Bl.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoriesController : ControllerBase
    {
        private readonly ISubCategoryServiceBl _subCategoryService;
        public SubCategoriesController(IBl bl)
        {
            _subCategoryService = bl.SubCategoryService;
        }
        [HttpGet("{categoryId}")]
        public ActionResult<List<SubCategoryBl>> GetSubCategoriesByCategoryId(int categoryId)
        {
            var subCategories = _subCategoryService.GetSubCategoriesByCategoryId(categoryId);
            if (subCategories == null || subCategories.Count == 0)
            {
                return NotFound("No subcategories found for this category.");
            }
            return Ok(subCategories);
        }

    }
}
