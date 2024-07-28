export function setupControls(...paddles) {
    document.addEventListener("keydown", (evt) => {
        paddles.forEach((paddle, index) => {
            switch (evt.key) {
                case "w":
                    if (index === 0) paddle.up = true;
                    break;
                case "s":
                    if (index === 0) paddle.down = true;
                    break;
                case "ArrowUp":
                    if (index === 1) paddle.up = true;
                    break;
                case "ArrowDown":
                    if (index === 1) paddle.down = true;
                    break;
                case "i":
                    if (index === 2) paddle.up = true;
                    break;
                case "k":
                    if (index === 2) paddle.down = true;
                    break;
                case "8":
                    if (index === 3) paddle.up = true;
                    break;
                case "5":
                    if (index === 3) paddle.down = true;
                    break;
            }
        });
    });

    document.addEventListener("keyup", (evt) => {
        paddles.forEach((paddle, index) => {
            switch (evt.key) {
                case "w":
                    if (index === 0) paddle.up = false;
                    break;
                case "s":
                    if (index === 0) paddle.down = false;
                    break;
                case "ArrowUp":
                    if (index === 1) paddle.up = false;
                    break;
                case "ArrowDown":
                    if (index === 1) paddle.down = false;
                    break;
                case "i":
                    if (index === 2) paddle.up = false;
                    break;
                case "k":
                    if (index === 2) paddle.down = false;
                    break;
                case "8":
                    if (index === 3) paddle.up = false;
                    break;
                case "5":
                    if (index === 3) paddle.down = false;
                    break;
            }
        });
    });
}



