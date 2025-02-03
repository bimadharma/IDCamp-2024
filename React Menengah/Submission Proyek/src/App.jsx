import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ArchivePage from "./pages/ArchivePage";
import NoteForm from "./components/NoteForm";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/api";
import RegsiterPage from "./pages/RegisterPage";
import HeaderLogin from "./components/HeaderLogin";
import { LocaleProvider } from "./contexts/LocaleContext";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
  
    if (!accessToken) {
      this.setState({ initializing: false });
      return;
    }
  
    putAccessToken(accessToken);
  
    try {
      const { data } = await getUserLogged();
      this.setState({
        authedUser: data,
        initializing: false,
      });
    } catch (error) {
      console.error("Authentication error:", error);
      this.setState({ initializing: false });
    }
  }
  

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => ({
      authedUser: null,
    }));
  
    putAccessToken("");
    localStorage.removeItem("accessToken");
  }
  

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <div className="contact-app">
            <HeaderLogin title={this.state.localeContext.locale === "id" ? "Aplikasi Kontak" : "Contacts App"} />
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                <Route path="/register" element={<RegsiterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      );
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <div className="app-container">
          <Header
            title={this.state.localeContext.locale === "id" ? "Aplikasi Kontak" : "Contacts App"}
            navigationLinks={[{ path: "/notes/archived", label: this.state.localeContext.locale === "id" ? "Arsip" : "Archive" }]}
            onLogout={this.onLogout}
            name={this.state.authedUser.name}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes/new" element={<NoteForm />} />
            <Route path="/notes/archived" element={<ArchivePage />} />
            <Route path="/notes/:id" element={<DetailPage />} />
            <Route path="/notfound" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
