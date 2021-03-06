## Gra karciana "Oczko"

#### Wykorzystane technologie: HTML5, CSS, JavaScript, React

#### Opis aplikacji:

Aplikacja opiera się na regułach gry karcianej "oczko".
Po włączeniu aplikacji, użytkownik ma możliwość wyboru trybu gry między rozgrywką dla pojedyńczego gracza, a trybem dla wielu graczy.<br />
<br />
1.Tryb pojedyńczego gracza:
<br />
* 1.1. Po wybraniu trybu dla pojedyńczego gracza, użytkownik może rozpocząć rozgrywkę lub cofnąć się do wyboru między grą dla pojedyńczego gracza, a grą wieloosobową.<br/>
* 1.21. Jeśli użytkownik wybierze opcje "Powrót do menu", powróci do menu głównego.<br />
* 1.22. W przypadku gdy użytkownik, wybierze przycisk "Rozpocznij grę", automatycznie uruchomi się gra. Na samym początku gracz i jego przeciwnik (komputer), otrzymują dwie wylosowane karty z talii. <br />
Następnie gracz ma możliwość wyboru, czy chce dobrać kolejną kartę czy wybiera opcję "pas". <br />
* 1.23. Jeśli  wybierze "Pobierz kartę", gracz otrzyma kolejną wylosowaną kartę. W przypadku, gdy gracz dobierze kolejną kartę i suma jego punktów będzie równa 21 gracz automatycznie wygra grę, jeśli natomiast suma punktów będzie większa lub równa 22 gracz automatycznie przegra rozgrywkę.<br />
* 1.24. Jeśli spasuje, następi kolejka przeciwnika.<br />
* 1.25 Po zakończeniu rozgrywki użytkownik ma możliwość zagrać ponownie.<br />

2.Tryb wieloosobowy:<br />
* 2.1. Po wybraniu trybu dla wielu gracz, użytkownik ma możliwość wyboru liczby graczy. Minimalna liczba graczy wynosi 2 a maksymalna 4. Po dokonaniu wyboru liczby graczy, należy zatwierdzić liczbę graczy, a następnie użytkownik może rozpocząć rozgrywkę. Gra rozpocznie się od wylosowania kart dla każdego z graczy. Pierwszy, swoją kolejkę otrzyma gracz 1. <br />
* 2.2. Będzie miał on możliwość doboru kolejnej karty lub spasowania.<br /> 
* 2.21. Jeśli gracz dobierze kartę i suma jego punktów wyniesie 21, automatycznie zostanie zwyciężcą rozgrywki, jeżeli natomiast suma jego punktów będzie większa lub równa 22, wybrany gracz automatycznie przegra. Gracz zostanie o tym poinformowany, wówczas swoją kolejkę otrzyma kolejny z graczy.<br />
* 2.22. Jeśli gracz spasuje, automatycznie następny gracz otrzyma swoją kolejkę.<br />
* 2.3 W przypadku gdy, żaden z graczy nie wygra wcześniej, zwyciężcą rozgrywki zostanie ten gracz, który osiągnie wynik najbardziej zbliżony do liczby 21.<br />


============================================================

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
