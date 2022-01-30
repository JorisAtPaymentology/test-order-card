import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CardOrderConfirmation from './components/CardOrderConfirmation';
import CardOrderForm from './components/CardOrderForm';
import CardOrderInvoice from './components/CardOrderInvoice';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CardOrderForm />
        </Route>
        <Route exact path="/order-confirmation">
          <CardOrderConfirmation />
        </Route>
        <Route exact path="/order-invoice">
          <CardOrderInvoice />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
