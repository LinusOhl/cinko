import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const theme = createTheme({
	fontFamily: "Inter, sans-serif",
	black: "#071013",
	white: "#E6E8E6",
	colors: {
		"r-yellow": [
			"#fff9e0",
			"#fff2ca",
			"#ffe49a",
			"#fed564",
			"#fdc838",
			"#fdc01a",
			"#fdbb05",
			"#e1a400",
			"#c89200",
			"#ae7d00",
		],
		"r-red": [
			"#ffeaec",
			"#fdd4d7",
			"#f3a8ad",
			"#eb7980",
			"#e4515a",
			"#e03742",
			"#df2935",
			"#c61b28",
			"#b11422",
			"#9c061b",
		],
		"r-blue": [
			"#e6f1ff",
			"#cddeff",
			"#9ab9ff",
			"#6392ff",
			"#3671ff",
			"#185cff",
			"#0152ff",
			"#0043e5",
			"#003bce",
			"#0032b6",
		],
		"r-grey": [
			"#f1f7f1",
			"#e6e8e6",
			"#cdcfcd",
			"#b1b4b1",
			"#999d99",
			"#8a8f8a",
			"#818881",
			"#6e766e",
			"#616961",
			"#505b50",
		],
	},
});

// Set up a Router instance
const router = createRouter({
	routeTree,
	context: {
		queryClient,
	},
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<MantineProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</MantineProvider>,
	);
}
