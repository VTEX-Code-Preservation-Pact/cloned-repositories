import * as React from "react";
import {Button} from "../src";
import {render, screen} from "@testing-library/react";


describe('App', function () {
    it('Test Jest is configured correctly', async () => {
        render(<Button/>)

        const buttonCount = await screen.findByRole('button');
        expect(buttonCount.innerHTML).toBe('Boop');
    });
});
