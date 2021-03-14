import { Form, Button } from 'semantic-ui-react';

export default function ChangeEmailForm(props) {
  const { user, logout, setReloadUser } = props;
  return (
    <div className="change-email-form">
      <h4>
        Cambia tu e-mail <span>(e-mail actual: {user.email})</span>
      </h4>
      <Form>
        <Form.Group widths="equal">
          <Form.Input name="email" placeholder="Tu nuevo e-mail" />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirma tu nuevo e-mail"
          />
        </Form.Group>
        <Button className="submit">Actualizar</Button>
      </Form>
    </div>
  );
}
