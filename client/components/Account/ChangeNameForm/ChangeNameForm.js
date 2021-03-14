import { Form, Button } from 'semantic-ui-react';

export default function ChangeNameForm(props) {
  const { user } = props;
  return (
    <div className="change-name-form">
      <h4>Cambia tu nombre y apellido</h4>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placehokder="Tu nuevo nombre"
            value={user.name}
          ></Form.Input>
          <Form.Input
            name="lastname"
            placehokder="Tus nuevos apellidos"
            value={user.lastname}
          ></Form.Input>
        </Form.Group>
        <Button className="submit">Actualizar</Button>
      </Form>
    </div>
  );
}
