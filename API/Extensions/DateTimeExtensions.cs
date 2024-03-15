namespace API.Extensions;

public static class DateTimeExtensions
{
    public static int CalculateAge(this DateOnly dob)
    {
        // var today = DateOnly.FromDateTime(DateTIme.UtcNow);
        // var age = today.Year - dob.Year;
        // if (dob.Year > today.AddYears(-age)) age--;

        return 37;
    }

}