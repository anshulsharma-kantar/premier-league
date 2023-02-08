/* eslint-disable testing-library/no-debugging-utils */
import App from "App";
import { screen } from "@testing-library/react";
import { act, loginAsUser, render } from "test/app-test-utils";
import userEvent from '@testing-library/user-event';


async function renderTeamPageScreen({ user }) {
    if (user === undefined) {
       user = await loginAsUser()
    }
    const route = '/teams'
    const utils = await render(<App />, { user, route })
    return { ...utils, user }
 }
 
 test('render requests list and check button(s) are available', async () => {
    await renderTeamPageScreen({})
 
    const teamLength = await screen.findAllByText(/arsenal/i);
    expect(teamLength).toHaveLength(1);
   //  screen.debug(teamLength)
 
    // const requestApprovedItems = await screen.findAllByText(/approved/i);
    // expect(requestApprovedItems).toHaveLength(5);
 });

 test('rows available', async () => {
   await renderTeamPageScreen({})

   await act(async () => {
      await sleep(1100);
   });

   const teamRows = screen.queryAllByRole('row')
   expect(teamRows).toHaveLength(11)
   // screen.debug(teamRows)

   await userEvent.click(teamRows.at(1));

   const dialogElement = await screen.findByRole('dialog');
   expect(dialogElement).toBeInTheDocument();
 })

 // a helper to use promises with timeouts
function sleep(period) {
   return new Promise(resolve => setTimeout(resolve, period));
}