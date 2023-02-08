/* eslint-disable testing-library/no-debugging-utils */
import App from "App";
import { screen } from "@testing-library/react";
import { act, loginAsUser, render } from "test/app-test-utils";

async function renderPlayerPageScreen({ user }) {
    if (user === undefined) {
       user = await loginAsUser()
    }
    const route = '/players'
    const utils = await render(<App />, { user, route })
    return { ...utils, user }
 }

 test('rows of the player table are available', async () => {
   await renderPlayerPageScreen({})

   const filterButton = await screen.findByRole('button', { name: /filters/i });
   expect(filterButton).toBeInTheDocument();

 })

 // a helper to use promises with timeouts
function sleep(period) {
   return new Promise(resolve => setTimeout(resolve, period));
}