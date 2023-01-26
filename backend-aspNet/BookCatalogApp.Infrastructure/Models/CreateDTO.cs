﻿using BookCatalogApp.Models;
using FluentValidation;


namespace BookCatalogApp.Infrastructure.Models
{
    public class CreateDTO
    {
        public long Isbn { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public decimal Price { get; set; }

        public Book ToEntities()
        {
            var book = new Book();
            book.Isbn = Isbn;
            book.Title = Title;
            book.Author = Author;
            book.Price = Price;
            return book;
        }
    }
    public class CreateDTOValidator : AbstractValidator<CreateDTO>
    {
        public CreateDTOValidator()
        {
            RuleFor(x => x.Isbn)
                .NotNull()
                .WithMessage("Insert ISBN ")
                .NotEmpty()
                .WithMessage("Value must be 0 or higher.")
                .NotEmpty()
                .WithMessage("Please, fill in the blank field with the ISBN");

            RuleFor(x => x.Title)
                .NotNull()
                .WithMessage("Insert Title")
                .NotEmpty()
                .WithMessage("Please, fill in the blank field with the Title");

            RuleFor(x => x.Author)
                .NotNull()
                .WithMessage("Insert Author")
                .NotEmpty()
                .WithMessage("Please, fill in the blank field with the Author");

            RuleFor(x => x.Price)
                .NotNull()
                .WithMessage("Insert Price")
                .GreaterThanOrEqualTo(0)
                .WithMessage("Value must be 0 or higher.")
                .NotEmpty()
                .WithMessage("Please, fill in the blank field with the price");
        }
    }
}