import React from 'react';
import './NewTicketHowto.css';

const NewTicketHowto = () =>
  <div className="new-ticket-howto">
    <h3>Creating a new ticket</h3>
    <p>A consumer of your company's product has reported a problem with one of your company's products. Document their issue by creating a new ticket!</p>
    <p>A <strong>Condictor</strong> ticket has the following properties:</p>
    <ul>
      <li>A <em>priority</em> from 1 (highest) to 5 (lowest).</li>
      <li>A <em>consumer</em> which you can select from a pre-established list in the database.</li>
      <li>The <em>product</em> which the consumer is having trouble with.</li>
      <li>A <em>description</em> of the problem.</li>
    </ul>
    <p><strong>The first line of the description will identify this ticket in search results, so make it brief and descriptive</strong>, and follow it up with as much detail as necessary. If you are familiar with <strong>Git</strong> commit messages, the idea is similar.</p>
    <p>Create the ticket by clicking the <strong>Create Ticket</strong> button, and your new ticket will appear below. From there you or your colleagues can add comments and close the ticket if necessary.</p>
  </div>;

export default NewTicketHowto;
