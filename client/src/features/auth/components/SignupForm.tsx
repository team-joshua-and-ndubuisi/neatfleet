import { SignupBodyT } from "../authTypes";

interface SignupFormProps {
  apiCall: (userCredentials: SignupBodyT) => Promise<void>;
}

const SignupForm = ({ apiCall }: SignupFormProps) => {
  return (
    <section>
      <h1>Signup Page</h1>
      <p>Please fill out the form to create an account.</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          console.log("form", form.email.value);

          const email = form.email.value;
          const firstName = form.firstName.value;
          const lastName = form.lastName.value;
          const password = form.password.value;

          apiCall({ email, password, firstName, lastName });
        }}>
        <h2>Create Account</h2>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            required
          />
        </label>

        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
          />
        </label>

        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            id="lastName"
            name="lastName"
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default SignupForm;
