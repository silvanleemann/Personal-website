public class CalculateAge {
  public static void main(String[] args) {
      // enter your date of birth
      LocalDate birthDate = LocalDate.of(1990, 4, 15);

      // get the current date
      LocalDate currentDate = LocalDate.now();

      // calculate the period between the dates
      Period period = Period.between(birthDate, currentDate);

      // display the age
      System.out.println("Your age is " + period.getYears() + " years, " + period.getMonths() + " months, and " + period.getDays() + " days.");
  }
}