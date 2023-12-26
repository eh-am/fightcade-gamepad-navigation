webpackJsonp(
  [0],
  [
    ,
    function (e, t, n) {
      "use strict";
      var a = n(2),
        s = n.n(a),
        i = {
          uri: "wss://ggs.fightcade.com/ws/",
          addr: "ggs.fightcade.com",
          port: 443,
          apiAddr: "web.fightcade.com",
          apiPort: 443,
        },
        l = {
          default: { id: "default", name: "Default", class: "theme-default" },
          lembranza: {
            id: "lembranza",
            name: "Lembranza",
            class: "theme-lembranza",
          },
          meigallo: {
            id: "meigallo",
            name: "Meigallo",
            class: "theme-meigallo",
          },
          rabudo: { id: "rabudo", name: "Rabudo", class: "theme-rabudo" },
          solpor: { id: "solpor", name: "Solpor", class: "theme-solpor" },
          vagalume: {
            id: "vagalume",
            name: "Vagalume",
            class: "theme-vagalume",
          },
          bretema: { id: "bretema", name: "Brétema", class: "theme-bretema" },
          luar: { id: "luar", name: "Luar", class: "theme-luar" },
          furancho: {
            id: "furancho",
            name: "Furancho",
            class: "theme-furancho",
          },
        },
        r = [
          { id: "about-channel" },
          { id: "welcome-channel" },
          { id: "patreon-channel" },
          { id: "search-channel" },
        ];
      t.a = {
        userRole: {},
        themes: l,
        filtersOptions: { years: [], genres: [], systems: [] },
        notificationTypeToVar: {
          message: "unseenMessages",
          mention: "unseenMentions",
          challenge: "unseenChallenges",
        },
        baseChannels: r,
        channelsList: { forNotifications: [], orderByGameIdLength: [] },
        activeTheme: l.default,
        doubleClickTime: 300,
        afkTime: 12e5,
        serverInfo: i,
        localUser: {},
        currentMatch: {},
        channelByGameId: {},
        setChannels: function (e) {
          var t = this;
          (this.channelsList.forNotifications = []),
            (this.channelsList.orderByGameIdLength = []),
            s.a.forEach(e, function (e) {
              t.channelsList.forNotifications.push({
                textToCompare: (e.gameid + " " + e.name).toLowerCase(),
                gameId: e.gameid,
                channelName: e.name,
                thumbnail: e.thumbnail,
              }),
                t.channelsList.orderByGameIdLength.push({
                  name: e.name,
                  gameId: e.gameid,
                });
            }),
            (this.channelsList.orderByGameIdLength = s.a.orderBy(
              this.channelsList.orderByGameIdLength,
              function (e) {
                return e.gameId.length;
              },
              ["desc"]
            ));
        },
        setFiltersOptions: function (e) {
          (this.filtersOptions.years = e.years),
            (this.filtersOptions.genres = e.genres),
            (this.filtersOptions.systems = e.systems),
            (this.filtersOptions.years = s.a.sortBy(this.filtersOptions.years)),
            (this.filtersOptions.genres = s.a.sortBy(
              this.filtersOptions.genres
            )),
            (this.filtersOptions.systems = s.a.sortBy(
              this.filtersOptions.systems
            )),
            this.filtersOptions.years.unshift("All"),
            this.filtersOptions.genres.unshift("All"),
            this.filtersOptions.systems.unshift("All");
        },
        setTheme: function (e) {
          this.activeTheme = l[e];
        },
        isGameChannel: function (e) {
          return -1 === s.a.findIndex(r, { id: e });
        },
        getPingSrc: function (e) {
          return e.wlan
            ? "static/ping/wlan_" + (e.vping || 0) + ".png"
            : "static/ping/connection_" + (e.vping || 0) + ".png";
        },
        getPingTitle: function (e) {
          if (e.wlan) {
            if (e.isLocal)
              return e.proxy
                ? "Low connection quality. Using VPN?"
                : "You might be using Wifi!";
            var t =
              Math.round(0.75 * e.ping) + "~" + e.ping + " ms" || "unknown";
            return e.proxy
              ? "Estimated ping: " + t + ", might be using VPN!"
              : "Estimated ping: " + t + ", might be using Wifi!";
          }
          return (
            "Estimated ping: " +
            (Math.round(0.75 * e.ping) + "~" + e.ping + " ms" || "unknown")
          );
        },
      };
    },
    ,
    ,
    ,
    function (e, t, n) {
      "use strict";
      t.a = {
        formatTime: function (e) {
          var t = e.getHours(),
            n = e.getMinutes();
          return t < 10 && (t = "0" + t), n < 10 && (n = "0" + n), t + ":" + n;
        },
        pointInBoundingBox: function (e, t, n) {
          return (
            !(e < n.left) && !(e > n.right) && !(t < n.top) && !(t > n.bottom)
          );
        },
        elementIsVisible: function (e, t) {
          var n = e.getBoundingClientRect(),
            a = t.getBoundingClientRect();
          return this.pointInBoundingBox(n.left, n.top + n.height, a);
        },
        validatePassword: function (e) {
          return e.length >= 8 && e.length < 100;
        },
        validateEmail: function (e) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            e
          );
        },
        getGravatar: function (e, t) {
          return "//www.gravatar.com/avatar/" + e + "?s=" + t + "&d=retro&r=pg";
        },
        decodeHTML: function (e) {
          var t = document.createElement("textarea");
          return (t.innerHTML = e), t.value;
        },
        encodedHTML: function (e) {
          return e.replace(/[\u00A0-\u9999<>]/gim, function (e) {
            return "&#" + e.charCodeAt(0) + ";";
          });
        },
        firstIndexOf: function (e, t, n) {
          for (var a = n; a < e.length; ++a)
            if (-1 !== t.indexOf(e[a])) return a;
          return -1;
        },
        isImageUrl: function (e) {
          return null != e.match(/\.(jpeg|jpg|gif|png)$/);
        },
      };
    },
    function (e, t, n) {
      "use strict";
      var a = n(29),
        s = n.n(a),
        i = n(2),
        l = n.n(i),
        r = n(1),
        o = n(22),
        c = function (e, t, n) {
          var a = {
            id: e.name,
            name: e.name,
            gravatar: e.gravatar,
            country: e.country || {},
            pingvariation: e.pingvariation || 0,
            away: e.away,
            wlan: e.wlan,
            proxy: e.proxy,
            role: e.role || r.a.userRole.regular,
            patreon: e.patreon,
            dev: e.dev,
            channels: [],
            channelsAway: [],
            channelRank: {},
            playing: null,
            settings: { ranked: e.ranked },
          };
          return (
            e.playing &&
              e.game &&
              (a.playing = {
                channelId: e.game.channelname,
                quarkId: e.game.quarkid,
                gameId: e.game.gameid,
                port: e.game.port,
              }),
            n &&
              ((a.channelRank[n] = e.rank),
              e.channel_away && a.channelsAway.push(n)),
            t
              ? ((a.isLocal = t),
                (a.email = e.email),
                (a.role = e.role || r.a.userRole.regular),
                (a.patreon = e.patreon),
                (a.dev = e.dev),
                (a.activeChannels = e.active_channels || []),
                (a.favoritesChannels = e.favorites_channels || []),
                (a.lobbyChannels = e.lobby_channels || []),
                (a.ignores = e.ignores || []),
                (a.token = e.token),
                (a.settings.delay = "delay" in e ? e.delay : -1),
                (a.settings.desktopNotifications = e.desktop_notifications),
                (a.settings.soundNotifications = e.sound_notifications),
                (a.settings.userEventsNotifications =
                  e.user_events_notifications),
                (a.settings.theme =
                  e.theme in r.a.themes ? e.theme : r.a.themes.default.id),
                (a.settings.usersSortBy = e.users_sort_by || "ping"),
                (a.settings.chatMuted = e.chat_muted),
                (a.settings.autoAfk = e.auto_afk),
                (a.settings.disableSpectators = e.disable_spectators),
                (a.settings.preventBadChallenges = e.prevent_bad_challenges),
                (a.settings.preventWifiChallenges = e.prevent_wifi_challenges),
                (a.settings.report = e.report),
                (a.perks = e.perks || {}))
              : ((a.vping = e.vping),
                (a.ping = e.ping),
                (a.remoteAddress = e.remoteAddress)),
            a
          );
        };
      t.a = {
        prepareSocket: function (e, t) {
          if (this.websocket) return void (t() && t());
          var n = new WebSocket(r.a.serverInfo.uri);
          n.binaryType = "arraybuffer";
          var a = this;
          (n.onopen = function () {
            (a.websocket = n), t && t();
          }),
            (n.onclose = function () {
              (a.connected = !1),
                a.genericCallbacks.onDisconnect(),
                (a.websocket = null);
            }),
            (n.onerror = function (e) {}),
            (n.onmessage = function (e) {
              if ("string" == typeof e.data) {
                var t = JSON.parse(e.data);
                if (t.result)
                  switch (t.req) {
                    case "autologin":
                      a.handleReqAutoLogin(t);
                      break;
                    case "login":
                      a.handleReqLogin(t);
                      break;
                    case "join":
                      a.handleReqJoin(t);
                      break;
                    case "leave":
                      a.handleReqLeave(t);
                      break;
                    case "newchannel":
                      a.handleReqNewChannel(t);
                      break;
                    case "chat":
                      a.handleReqChat(t);
                      break;
                    case "msg":
                      a.handleReqMsg(t);
                      break;
                    case "welcome":
                      a.handleReqWelcome(t);
                      break;
                    case "channels":
                      a.handleReqChannels(t);
                      break;
                    case "challenge":
                      a.handleReqChallenge(t);
                      break;
                    case "accept":
                      a.handleReqAccept(t);
                      break;
                    case "updateuser":
                      a.handleReqUpdateUser(t);
                      break;
                    case "linkpreview":
                      a.handleReqLinkPreview(t);
                      break;
                    case "filteroptions":
                      a.handleReqFilterOptions(t);
                      break;
                    case "command":
                      a.handleReqCommand(t);
                      break;
                    case "report":
                      a.handleReqReport(t);
                  }
                else
                  switch (t.req) {
                    case "broken":
                      a.handleEvtBroken(t);
                      break;
                    case "chat":
                      a.handleEvtChat(t);
                      break;
                    case "msg":
                      a.handleEvtMsg(t);
                      break;
                    case "join":
                      a.handleEvtJoin(t);
                      break;
                    case "leave":
                      a.handleEvtLeave(t);
                      break;
                    case "kick":
                      a.handleEvtKick(t);
                      break;
                    case "challenge":
                      a.handleEvtChallenge(t);
                      break;
                    case "cancel":
                      a.handleEvtCancel(t);
                      break;
                    case "reject":
                      a.handleEvtReject(t);
                      break;
                    case "accept":
                      a.handleEvtAccept(t);
                      break;
                    case "start":
                      a.handleEvtStart(t);
                      break;
                    case "staway":
                    case "stnoaway":
                    case "chaway":
                    case "chnoaway":
                      a.handleEvtAway(t);
                      break;
                    case "stwlan":
                      a.handleEvtWlan(t);
                      break;
                    case "updaterank":
                      a.handleEvtUpdateRank(t);
                      break;
                    case "stplaying":
                    case "stnoplaying":
                      a.handleEvtPlaying(t);
                      break;
                    case "quarkstats":
                      a.handleEvtQuarkStats(t);
                  }
              }
            });
        },
        init: function (e) {
          (this.genericCallbacks = e || {}),
            (this.connected = !1),
            (this.requestIdx = 0),
            (this.requestCallback = {});
        },
        autoConnect: function (e) {
          for (
            var t = document.cookie.split("; "), n = null, a = 0;
            a < t.length;
            ++a
          ) {
            var s = t[a].split("=");
            if ("fcic" === s[0]) {
              n = s[1];
              break;
            }
          }
          if (n) {
            var i = this;
            return (
              o.a.getLocation(function (t) {
                i.prepareSocket(e, function () {
                  i.sendCmd({
                    req: "autologin",
                    cookie: n,
                    location: t.location,
                  });
                });
              }),
              !0
            );
          }
          return !1;
        },
        connect: function (e, t, n) {
          var a = this;
          o.a.getLocation(function (s) {
            a.prepareSocket(n, function () {
              a.sendCmd({
                req: "login",
                username: e,
                userpass: t,
                location: s.location,
              });
            });
          });
        },
        logout: function () {
          (document.cookie = "fcic=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"),
            this.close();
        },
        close: function () {
          this.websocket.close(), (this.connected = !1);
        },
        joinChannel: function (e, t, n) {
          this.sendCmd(
            {
              req: "join",
              channelname: e,
              status: "available",
              away: !0 === t.isAway,
              idx: l.a.isUndefined(t.idx) ? -1 : t.idx,
            },
            n
          );
        },
        leaveChannel: function (e, t) {
          this.sendCmd({ req: "leave", channelname: e }, t);
        },
        newChannel: function (e, t) {
          this.sendCmd({ req: "newchannel", channelname: e }, t);
        },
        delChannel: function (e, t) {
          this.sendCmd({ req: "delchannel", channelname: e });
        },
        favChannel: function (e, t) {
          this.sendCmd({ req: "favchannel", channelname: e, fav: t });
        },
        ignoreUser: function (e, t) {
          this.sendCmd({ req: "ignore", username: e, ignore: t });
        },
        setAway: function (e, t) {
          t
            ? this.sendCmd({ req: e ? "chaway" : "chnoaway", channelname: t })
            : this.sendCmd({ req: e ? "staway" : "stnoaway" });
        },
        sendChatMessage: function (e, t, n) {
          this.sendCmd({ req: "chat", channelname: e, chat: t }, n);
        },
        sendMsgMessage: function (e, t, n, a) {
          this.sendCmd({ req: "msg", channelname: e, msg: t, username: n }, a);
        },
        sendCommand: function (e, t, n, a) {
          this.sendCmd(
            { req: "command", command: t, channelname: e, input: n },
            a
          );
        },
        sendReport: function (e, t) {
          var n = l.a.clone(e);
          (n.req = "report"), this.sendCmd(n, t);
        },
        listWelcome: function (e) {
          this.sendCmd({ req: "welcome" }, e);
        },
        listAllChannels: function (e) {
          this.sendCmd({ req: "channels", all: !0 }, e);
        },
        listChannels: function (e, t, n, a, s, i, l, r) {
          this.sendCmd(
            {
              req: "channels",
              filter: t ? t.trim() : t,
              genre: n,
              year: a,
              system: s,
              ranked: i,
              favorites: l,
              paginated: !0,
              page: e,
            },
            r
          );
        },
        listFiltersOptions: function (e) {
          this.sendCmd({ req: "filteroptions" }, e);
        },
        challengeUser: function (e, t, n, a, s) {
          this.sendCmd(
            {
              req: "challenge",
              username: e,
              channelname: t,
              challengeid: n,
              ranked: a,
            },
            s
          );
        },
        cancelChallenge: function (e, t, n) {
          this.sendCmd({
            req: "cancel",
            username: e,
            channelname: t,
            challengeid: n,
          });
        },
        declineChallenge: function (e, t, n) {
          this.sendCmd({
            req: "reject",
            username: e,
            channelname: t,
            challengeid: n,
          });
        },
        acceptChallenge: function (e, t, n, a, s) {
          this.sendCmd(
            {
              req: "accept",
              username: e,
              channelname: t,
              challengeid: n,
              ranked: a,
            },
            s
          );
        },
        updateUser: function (e, t) {
          var n = l.a.clone(e);
          (n.req = "updateuser"), this.sendCmd(n, t);
        },
        getLinkPreview: function (e, t) {
          this.sendCmd({ req: "linkpreview", url: e }, t);
        },
        getMatchUri: function (e, t, n, a, s, i, l) {
          return (
            "fcade://served/" +
            e +
            "/" +
            t +
            "/" +
            n +
            "." +
            a +
            "," +
            s +
            "," +
            i +
            "," +
            l
          );
        },
        getLaunchUri: function (e, t, n, a, s, i, l, r, o, c) {
          return (
            "fcade://launch/" +
            e +
            "/" +
            t +
            "/" +
            n +
            "." +
            a +
            "," +
            s +
            "," +
            i +
            "," +
            (0 === a ? "0.0.0.0" : "127.0.0.1") +
            "/" +
            c
          );
        },
        getSpectateUri: function (e, t, n, a) {
          return "fcade://stream/" + e + "/" + t + "/" + n + ".2," + a;
        },
        getReplayUrl: function (e, t, n) {
          return "https://replay.fightcade.com/" + e + "/" + t + "/" + n;
        },
        getEndMatchUri: function () {
          return "fcade://killemu";
        },
        getAutoUpdateUri: function () {
          return "fcade://autoupdate";
        },
        getPlayAloneUri: function (e, t) {
          return "fcade://play/" + e + "/" + t;
        },
        getPlayTrainingUri: function (e, t) {
          return "fcade://training/" + e + "/" + t;
        },
        getUserStatusUri: function (e, t) {
          return "fcade://userstatus/" + e + "/" + t;
        },
        getCheckRomStatusUri: function (e, t) {
          return "fcade://checkrom/" + e + "/" + t;
        },
        sendCmd: function (e, t) {
          (e.requestIdx = t ? this.requestIdx : -1),
            t && (this.requestCallback[this.requestIdx++] = t),
            this.websocket.send(s()(e)),
            this.updateAfkTimeout();
        },
        handleReqAutoLogin: function (e) {
          200 === e.result
            ? ((this.connected = !0),
              this.genericCallbacks.onConnect(c(e.user, !0), e.app_info || {}))
            : this.genericCallbacks.onConnectError("auto-login-failed", e);
        },
        handleReqLogin: function (e) {
          if (200 === e.result)
            (this.connected = !0),
              this.genericCallbacks.onConnect(c(e.user, !0), e.app_info || {}),
              e.cookie &&
                (document.cookie =
                  "fcic=" +
                  e.cookie +
                  "; expires=Fri, 31 Dec 9999 23:59:59 GMT; Path=/;Secure");
          else {
            var t = {
              "user wrong password": "wrong-password",
              "too many failed login": "too-many-failed-login",
              "login locked": "login-locked",
              "user not found": "user-not-found",
              "user locked": "user-locked",
              "user newaccount muted": "user-newaccount-muted",
              "user banned": "user-banned",
              "server locked": "server-locked",
              "old version": "old-version",
            };
            this.genericCallbacks.onConnectError(t[e.error] || "unknown", e);
          }
        },
        handleReqJoin: function (e) {
          if (-1 !== e.requestIdx)
            if (200 === e.result) {
              for (var t = 0; t < e.users.length; ++t)
                e.users[t] = c(e.users[t], !1, e.channelname);
              this.requestCallback[e.requestIdx](e);
            } else this.requestCallback[e.requestIdx]();
        },
        handleReqLeave: function (e) {
          200 === e.result &&
            -1 !== e.requestIdx &&
            this.requestCallback[e.requestIdx] &&
            this.requestCallback[e.requestIdx](e);
        },
        handleReqNewChannel: function (e) {
          200 === e.result &&
            -1 !== e.requestIdx &&
            this.requestCallback[e.requestIdx] &&
            this.requestCallback[e.requestIdx](e);
        },
        handleReqChat: function (e) {
          -1 !== e.requestIdx &&
            (200 === e.result
              ? this.requestCallback[e.requestIdx]()
              : 400 === e.result &&
                e.isspam &&
                this.requestCallback[e.requestIdx](!0));
        },
        handleReqMsg: function (e) {
          -1 !== e.requestIdx &&
            (200 === e.result
              ? this.requestCallback[e.requestIdx]()
              : 400 === e.result &&
                e.isspam &&
                this.requestCallback[e.requestIdx](!0));
        },
        handleReqWelcome: function (e) {
          200 === e.result &&
            -1 !== e.requestIdx &&
            this.requestCallback[e.requestIdx](e);
        },
        handleReqChannels: function (e) {
          200 === e.result &&
            -1 !== e.requestIdx &&
            this.requestCallback[e.requestIdx](e);
        },
        handleReqChallenge: function (e) {
          -1 !== e.requestIdx && this.requestCallback[e.requestIdx](e);
        },
        handleReqAccept: function (e) {
          200 === e.result &&
            -1 !== e.requestIdx &&
            this.requestCallback[e.requestIdx]({
              gameid: e.gameid,
              user: { name: e.username, id: e.username },
              quarkid: e.quarkid,
            });
        },
        handleReqUpdateUser: function (e) {
          -1 !== e.requestIdx &&
            this.requestCallback[e.requestIdx](200 === e.result, e.user);
        },
        handleReqCommand: function (e) {
          -1 !== e.requestIdx && this.requestCallback[e.requestIdx](e.response);
        },
        handleReqReport: function (e) {
          -1 !== e.requestIdx &&
            this.requestCallback[e.requestIdx](e.result, e.isspam);
        },
        handleEvtBroken: function (e) {
          this.genericCallbacks.onChatMessage &&
            this.genericCallbacks.onChatMessage(
              e.channelname,
              e.username,
              e.msg
            );
        },
        handleEvtChat: function (e) {
          this.genericCallbacks.onChatMessage &&
            this.genericCallbacks.onChatMessage(
              e.channelname,
              e.username,
              e.chat
            );
        },
        handleEvtMsg: function (e) {
          this.genericCallbacks.onMsgMessage &&
            this.genericCallbacks.onMsgMessage(
              e.channelname,
              e.username,
              e.msg,
              e
            );
        },
        handleEvtJoin: function (e) {
          if (this.genericCallbacks.onUserJoin) {
            var t = c(e.user, !1, e.channelname);
            this.genericCallbacks.onUserJoin(t, e.channelname);
          }
        },
        handleEvtLeave: function (e) {
          this.genericCallbacks.onUserLeave &&
            this.genericCallbacks.onUserLeave(
              { name: e.user.name, id: e.user.name },
              e.channelname
            );
        },
        handleEvtKick: function (e) {
          this.genericCallbacks.onUserKick &&
            this.genericCallbacks.onUserKick(e.channelname);
        },
        handleEvtChallenge: function (e) {
          this.genericCallbacks.onChallengeRequest &&
            this.genericCallbacks.onChallengeRequest(
              { name: e.user.name, id: e.user.name },
              e.channelname,
              e.challengeid,
              e.ranked
            );
        },
        handleEvtCancel: function (e) {
          this.genericCallbacks.onChallengeCancel &&
            this.genericCallbacks.onChallengeCancel(
              { user: e.user.name, id: e.user.name },
              e.channelname,
              e.challengeid
            );
        },
        handleEvtReject: function (e) {
          this.genericCallbacks.onChallengeDecline &&
            this.genericCallbacks.onChallengeDecline(
              { user: e.user.name, id: e.user.name },
              e.channelname,
              e.challengeid
            );
        },
        handleEvtAccept: function (e) {
          this.genericCallbacks.onChallengeAccept &&
            this.genericCallbacks.onChallengeAccept(
              { user: e.user.name, id: e.user.name },
              e.channelname,
              e.challengeid
            );
        },
        handleEvtStart: function (e) {
          this.genericCallbacks.onChallengeStart &&
            this.genericCallbacks.onChallengeStart(
              e.channelname,
              e.quarkid,
              e.playerid,
              e.port,
              e.ranked,
              e.delay,
              e.token,
              c(e.user, !1, e.channelname)
            );
        },
        handleEvtAway: function (e) {
          if (this.genericCallbacks.onUserAwayStateChanges) {
            var t = "staway" === e.req || "chaway" === e.req;
            this.genericCallbacks.onUserAwayStateChanges(
              e.username,
              t,
              e.channelname
            );
          }
        },
        handleEvtWlan: function (e) {
          this.genericCallbacks.onUserWlanChanges(e.username);
        },
        handleEvtUpdateRank: function (e) {
          this.genericCallbacks.onUserRankChanges(e.username, e.ranked);
        },
        handleEvtPlaying: function (e) {
          this.genericCallbacks.onUserPlayingStateChanges &&
            this.genericCallbacks.onUserPlayingStateChanges(
              e.username,
              "stplaying" === e.req,
              e.game.channelname,
              e.game.quarkid,
              e.game.gameid,
              e.playerid,
              e.game.port,
              e.game.ranked,
              e.elo,
              e.rank,
              e.scores
            );
        },
        handleEvtQuarkStats: function (e) {
          this.genericCallbacks.onQuarkStats &&
            this.genericCallbacks.onQuarkStats(
              e.channelname,
              e.quark.quarkid,
              e.quark.spectators
            );
        },
        handleReqLinkPreview: function (e) {
          -1 !== e.requestIdx &&
            (200 === e.result
              ? this.requestCallback[e.requestIdx]({
                  url: e.url,
                  name: e.name,
                  title: e.title,
                  description: e.description,
                  imageSrc: e.imageSrc,
                })
              : this.requestCallback[e.requestIdx]());
        },
        handleReqFilterOptions: function (e) {
          -1 !== e.requestIdx &&
            (200 === e.result
              ? this.requestCallback[e.requestIdx]({
                  years: e.years,
                  genres: e.genres,
                  systems: e.systems,
                })
              : this.requestCallback[e.requestIdx]());
        },
        updateAfkTimeout: function () {
          var e = this,
            t = this;
          t.timerActivity && clearTimeout(t.timerActivity),
            (t.timeActivity = new Date()),
            (t.timerActivity = setTimeout(function () {
              new Date() - t.timeActivity >= r.a.afkTime &&
                !r.a.playing &&
                !r.a.localUser.away &&
                r.a.localUser.settings.autoAfk &&
                e.setAway(!0);
            }, r.a.afkTime));
        },
      };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      "use strict";
      var a = n(29),
        s = n.n(a),
        i = n(173),
        l = n.n(i);
      t.a = {
        init: function (e, t) {
          (this.serverAddr = e), (this.port = t);
        },
        getLocation: function (e) {
          var t = { req: "location" };
          this.doPost(t, e);
        },
        createUser: function (e, t, n, a, s) {
          var i = { req: "reguser", email: e, username: t, pwd: n, token: a },
            l = this;
          this.doPost(i, function (e) {
            var t = {};
            e.user
              ? (t.result = "ok")
              : ((t.result = "error"), (t.error = l.getErrorCode(e.res))),
              s(t);
          });
        },
        doRequest: function (e, t) {
          var n = {
            host: this.serverAddr,
            port: this.port,
            method: "GET",
            path: "/api/" + encodeURIComponent(s()(e)),
          };
          l.a
            .request(n, function (e) {
              var n = "";
              e.on("data", function (e) {
                n += e;
              }),
                e.on("end", function () {
                  t(JSON.parse(n));
                });
            })
            .end();
        },
        doPost: function (e, t) {
          var n = s()(e),
            a = {
              host: this.serverAddr,
              port: this.port,
              method: "POST",
              path: "/api/",
              headers: {
                "Content-Type": "application/json",
                "Content-Length": n.length,
              },
            },
            i = l.a.request(a, function (e) {
              var n = "";
              e.on("data", function (e) {
                n += e;
              }),
                e.on("end", function () {
                  t(JSON.parse(n));
                });
            });
          i.write(n), i.end();
        },
        getErrorCode: function (e) {
          return (
            {
              "recaptcha error": "recaptcha-error",
              "user name invalid": "user-name-invalid",
              "user name too long": "user-name-too-long",
              "user name too short": "user-name-too-short",
              "user wrong email": "user-wrong-email",
              "password length invalid": "password-length-invalid",
              "user already created": "user-already-exists",
            }[e] || "unknown"
          );
        },
      };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      n(147);
      var a = n(0)(n(66), n(231), "data-v-57e21be6", null);
      e.exports = a.exports;
    },
    ,
    ,
    function (e, t, n) {
      n(132);
      var a = n(0)(n(60), n(216), null, null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(134);
      var a = n(0)(n(95), n(218), null, null);
      e.exports = a.exports;
    },
    ,
    function (e, t, n) {
      "use strict";
      var a = n(6);
      t.a = {
        list: [
          {
            name: "/away",
            description: "Set global status to away",
            execute: function (e, t) {
              return a.a.setAway(!0), "Global status set to away.";
            },
          },
          {
            name: "/back",
            description: "Set global status to online",
            execute: function (e, t) {
              return a.a.setAway(!1), "Global status set to online.";
            },
          },
          {
            name: "/channel_away",
            description: "Set channel status to away",
            execute: function (e, t) {
              return (
                a.a.setAway(!0, e.channel.id), "Channel status set to away."
              );
            },
          },
          {
            name: "/channel_back",
            description: "Set channel status to online",
            execute: function (e, t) {
              return (
                a.a.setAway(!1, e.channel.id), "Channel status set to online."
              );
            },
          },
          {
            name: "/test",
            description: "Test current channel's game",
            execute: function (e, t) {
              e.$emit("play-alone");
            },
          },
          {
            name: "/training",
            description:
              "Launch current channel's training mode (if supported)",
            execute: function (e, t) {
              e.$emit("play-training");
            },
          },
          {
            name: "/ignore",
            description: "Ignore user",
            execute: function (e, t) {
              if (!t || t.length < 1) return "Error! Syntax: /ignore username";
              var n = t.join(" ");
              return (
                e.$emit("ignore-user", n, !0),
                "User [" + n + "] will be ignored from now on."
              );
            },
          },
          {
            name: "/unignore",
            description: "Unignore user",
            execute: function (e, t) {
              if (!t || t.length < 1)
                return "Error! Syntax: /unignore username";
              var n = t.join(" ");
              return (
                e.$emit("ignore-user", n, !1),
                "User [" + n + "] is no longer ignored."
              );
            },
          },
          {
            name: "/challenge",
            description: "Challenge user",
            execute: function (e, t, n) {
              if (!t || t.length < 1)
                return "Error! Syntax: /challenge username [FTX]";
              var a = "",
                s = 0,
                i = t[t.length - 1].trim().toLowerCase();
              0 === i.indexOf("ft")
                ? ((s = parseInt(i.substring(2))),
                  -1 === [2, 3, 5, 10, 20].indexOf(s) && (s = 0),
                  (a = t.slice(0, t.length - 1).join(" ")))
                : (a = t.join(" "));
              var l = n[a];
              if (!l) return "Can't find user [" + a + "].";
              e.$emit("challenge-user", l, s);
            },
          },
          {
            name: "/clear",
            description: "Clear chat",
            execute: function (e, t) {
              e.$emit("clear-chat");
            },
          },
        ],
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(3),
        s = n(56),
        i = (n.n(s), n(55)),
        l = n.n(i),
        r = n(54);
      a.a.use(r.a, { observer: !0 }),
        (a.a.config.productionTip = !1),
        new a.a({
          el: "#app",
          template: '<App ref="app"/>',
          components: { App: l.a },
        }).$refs.app.init();
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(96),
        s = n.n(a),
        i = n(3),
        l = n(2),
        r = n.n(l),
        o = n(1),
        c = n(165),
        h = n.n(c),
        u = n(22),
        d = n(205),
        g = n.n(d),
        v = n(182),
        f = n.n(v),
        m = n(188),
        p = n.n(m),
        C = n(187),
        _ = n.n(C),
        k = n(179),
        y = n.n(k),
        w = n(186),
        b = n.n(w),
        x = n(209),
        M = n.n(x),
        I = n(204),
        U = n.n(I),
        $ = n(203),
        A = n.n($),
        S = n(6),
        F = n(5);
      t.default = {
        name: "app",
        components: {
          MainToolbar: g.a,
          Channel: f.a,
          ContextMenu: A.a,
          Login: U.a,
          UserInfo: M.a,
          WelcomeChannel: p.a,
          SearchChannel: _.a,
          AboutChannel: y.a,
          PatreonChannel: b.a,
        },
        data: function () {
          return {
            initializingApp: !1,
            autoLoginning: !0,
            numChannelsInitialized: 0,
            channelsInitialized: !1,
            welcomeChannelInitialized: !1,
            searchChannelInitialized: !1,
            channels: r.a.clone(o.a.baseChannels),
            activeChannelId: null,
            status: "disconnected",
            emojisData: null,
            contextMenuData: null,
            userInfoData: null,
            globalUsers: {},
            global: o.a,
            numJoiningChannels: 0,
          };
        },
        methods: {
          init: function () {
            u.a.init(o.a.serverInfo.apiAddr, o.a.serverInfo.apiPort),
              h.a.needsPermission &&
                h.a.isSupported() &&
                h.a.requestPermission();
            var e = this;
            (this.connectionCallbacks = {
              onConnect: function (t, n) {
                (t.country = e.getCountry(t.country)),
                  (e.autoLoginning = !1),
                  (e.initializingApp = !0),
                  (e.status = "connected"),
                  (e.globalUsers[t.id] = t),
                  (o.a.localUser = t),
                  (o.a.userRole = n.roles),
                  window.location.assign(
                    S.a.getUserStatusUri("stwlan", t.token)
                  ),
                  i.a.nextTick(function () {
                    e.checkPerksAvailability();
                    var n = 0;
                    t.activeChannels.length > 0
                      ? r.a.forEach(t.activeChannels, function (t) {
                          e.joinChannel(t.channelname, {
                            skipCheck: !0,
                            away: t.away,
                            index: n++,
                          });
                        })
                      : ((e.channelsInitialized = !0),
                        e.checkChannelsAreInitialized()),
                      S.a.listAllChannels(function (e) {
                        r.a.forEach(e.channels, function (e) {
                          o.a.channelByGameId[e.gameid] = e.name;
                        }),
                          o.a.setChannels(e.channels);
                      }),
                      S.a.listFiltersOptions(function (e) {
                        o.a.setFiltersOptions(e);
                      }),
                      e.$refs.mainToolbar.setChannels(e.channels),
                      e.selectChannel("about-channel");
                  });
              },
              onConnectError: function (t, n) {
                "auto-login-failed" !== t && e.$refs.login.onConnectError(t, n),
                  (e.autoLoginning = !1),
                  (e.initializingApp = !1);
              },
              onDisconnect: function () {
                (e.globalUsers = {}),
                  (e.channels = r.a.clone(o.a.baseChannels)),
                  (e.activeChannelId = null),
                  (e.contextMenuData = null),
                  (e.userInfoData = null),
                  (e.emojisData = null),
                  (e.status = "disconnected"),
                  (e.initializingApp = !1),
                  (e.autoLoginning = !1),
                  (e.numChannelsInitialized = 0),
                  (e.channelsInitialized = !1),
                  (e.welcomeChannelInitialized = !1),
                  (e.searchChannelInitialized = !1),
                  (e.numJoiningChannels = 0),
                  (o.a.channelByGameId = {}),
                  (o.a.localUser = null),
                  (o.a.activeTheme = o.a.themes.default);
              },
              onChatMessage: function (t, n, a) {
                var s = e.globalUsers[n];
                s
                  ? s.isLocal ||
                    o.a.localUser.settings.chatMuted ||
                    e.getChannelComponentById(t).onChatMessage(s, a)
                  : "Channel" === n &&
                    e.getChannelComponentById(t).onChannelMessage(a);
              },
              onBrokenMessage: function (t, n, a) {
                e.getChannelComponentById(t).onChatMessage(n, a);
              },
              onMsgMessage: function (e, t, n, a) {},
              onUserJoin: function (t, n) {
                if (t.id !== o.a.localUser.id) {
                  var a = e.addUserToChannel(t, n),
                    s = e.getChannelComponentById(n);
                  s && s.addUser(a);
                }
              },
              onUserLeave: function (t, n) {
                if (t.id !== o.a.localUser.id) {
                  var a = e.getChannelComponentById(n);
                  a && a.removeUser(t), e.removeUserFromChannel(t, n);
                }
              },
              onUserKick: function (t) {
                e.onLeaveChannel(t);
              },
              onNewChannel: function (t) {
                e.onLeaveChannel(t);
              },
              onChallengeRequest: function (t, n, a, s) {
                var i = e.getChannelComponentById(n);
                i && i.userChallenged(e.globalUsers[t.id], a, s);
              },
              onChallengeCancel: function (t, n, a) {
                e.removeChallengeNotifications(t, n, a, "cancelled");
                var s = e.getChannelComponentById(n);
                s && s.challengeCancelled(t, a);
              },
              onChallengeDecline: function (t, n, a) {
                var s = e.getChannelComponentById(n);
                s && s.challengeDeclined(t, a);
              },
              onChallengeAccept: function (t, n, a, s) {
                if (!o.a.localUser.playing) {
                  var i = e.getChannelComponentById(n);
                  i && i.challengeAccepted(t, a, s);
                }
              },
              onChallengeStart: function (t, n, a, s, i, l, c, h) {
                (o.a.currentMatch = { playerId: a, ranked: i, opponent: h }),
                  (o.a.playing = !0);
                var u = e.getChannelComponentById(t);
                if (u) {
                  if (
                    "nulldc" === u.data.emulator ||
                    "duckstation" === u.data.emulator ||
                    "flycast" === u.data.emulator ||
                    "custom" === u.data.emulator
                  ) {
                    var d = 0 === a ? o.a.localUser.name : h.name,
                      g = 1 === a ? o.a.localUser.name : h.name,
                      v = S.a.getLaunchUri(
                        u.data.emulator,
                        u.data.gameid,
                        n,
                        a,
                        s,
                        l,
                        d,
                        g,
                        h.remoteAddress,
                        c
                      );
                    window.location.assign(v);
                  } else {
                    var f = S.a.getMatchUri(
                      u.data.emulator,
                      u.data.gameid,
                      n,
                      a,
                      s,
                      l,
                      i
                    );
                    window.location.assign(f);
                  }
                  r.a.forEach(o.a.localUser.channels, function (t) {
                    var n = e.getChannelComponentById(t);
                    n &&
                      (n.cancelAllChallengesRequests(),
                      n.declineAllChallengesRequested());
                  });
                }
              },
              onUserAwayStateChanges: function (t, n, a) {
                e.onUserAwayStateChanges(t, n, a);
              },
              onUserPlayingStateChanges: function (
                t,
                n,
                a,
                s,
                i,
                l,
                r,
                o,
                c,
                h,
                u
              ) {
                e.onUserPlayingStateChanges(t, n, a, s, i, l, r, o, c, h, u);
              },
              onUserWlanChanges: function (t) {
                var n = e.globalUsers[t];
                n && i.a.set(n, "wlan", !0);
              },
              onUserRankChanges: function (t, n) {
                var a = e.globalUsers[t];
                a && !a.isLocal && i.a.set(a.settings, "ranked", n);
              },
              onQuarkStats: function (t, n, a) {
                var s = e.getChannelComponentById(t);
                s && s.onQuarkStats(n, a);
              },
            }),
              S.a.init(this.connectionCallbacks),
              S.a.autoConnect() || (this.autoLoginning = !1),
              window.location.assign(S.a.getAutoUpdateUri());
          },
          connect: function (e, t) {
            (this.autoLoginning = !1),
              (this.initializingApp = !0),
              S.a.connect(e, t, this.connectionCallbacks);
          },
          disconnect: function () {
            "connected" === this.status && S.a.close();
          },
          selectChannel: function (e, t) {
            var n = this.getChannelComponentById(e);
            (this.activeChannelId = e),
              this.$refs.mainToolbar.setActiveChannel(e),
              n.onSelect(t);
          },
          joinChannel: function (e, t) {
            var n = t && t.away,
              a = t && t.index,
              s = t && t.select,
              l = t && t.skipCheck;
            if (
              !(
                this.channels.length -
                  o.a.baseChannels.length +
                  this.numJoiningChannels >=
                o.a.localUser.perks.maxNumChannels
              )
            ) {
              var c = this;
              ++this.numJoiningChannels,
                S.a.joinChannel(e, { isAway: n, idx: a }, function (e) {
                  if ((--c.numJoiningChannels, e)) {
                    var t = {
                      id: e.channelname,
                      name: e.channelname,
                      gameid: e.gameid,
                      ranked: e.ranked,
                      training: e.training,
                      emulator: e.emulator,
                      spectators: e.spectators,
                      outerNotifications: [],
                      unseenMessages: [],
                      unseenMentions: [],
                      unseenChallenges: [],
                    };
                    l ||
                      window.location.assign(
                        S.a.getCheckRomStatusUri(e.emulator, e.gameid)
                      ),
                      c.channels.push(t),
                      c.$refs.mainToolbar.setChannels(c.channels),
                      i.a.nextTick(function () {
                        var a = [],
                          l = {};
                        r.a.forEach(e.users, function (e) {
                          a.push(c.addUserToChannel(e, t.id)),
                            e.playing && (l[e.id] = e.playing);
                        }),
                          r.a.forEach(e.quarks, function (e) {
                            r.a.forEach(e.players, function (t, n) {
                              var a = l[t];
                              a &&
                                c.onUserPlayingStateChanges(
                                  t,
                                  !0,
                                  a.channelId,
                                  e.quarkid,
                                  a.gameId,
                                  n,
                                  e.port,
                                  e.ranked
                                );
                            });
                          }),
                          n &&
                            (i.a.set(t, "localUserIsAway", !0),
                            S.a.setAway(!0, t.id)),
                          (e.users = a),
                          c.getChannelComponentById(t.id).onJoin(e),
                          s && c.selectChannel(t.id),
                          c.$refs["welcome-channel"].onUserChannelIO(),
                          c.$refs["search-channel"].onUserChannelIO(),
                          i.a.set(
                            o.a.localUser,
                            "maxNumChannelsReached",
                            o.a.localUser.perks.maxNumChannels <=
                              o.a.localUser.channels.length
                          );
                      });
                  } else c.channelItemInitialized(!0);
                });
            }
          },
          newChannel: function (e) {
            var t = this;
            S.a.newChannel(e, function (e) {
              -1 === o.a.localUser.lobbyChannels.indexOf(e.channelname) &&
                o.a.localUser.lobbyChannels.push(e.channelname),
                t.joinChannel(e.channelname, { select: !0 });
            });
          },
          delChannel: function (e) {
            S.a.delChannel(e);
            var t = o.a.localUser.lobbyChannels.indexOf(e);
            -1 !== t && i.a.delete(o.a.localUser.lobbyChannels, t);
          },
          favChannel: function (e, t) {
            S.a.favChannel(e, t);
            var n = this.getChannelComponentById(e);
            if ((n && (n.isFavorite = t), t))
              -1 === o.a.localUser.favoritesChannels.indexOf(e) &&
                o.a.localUser.favoritesChannels.push(e);
            else {
              var a = o.a.localUser.favoritesChannels.indexOf(e);
              -1 !== a && i.a.delete(o.a.localUser.favoritesChannels, a);
            }
          },
          leaveChannel: function (e) {
            var t = this;
            S.a.leaveChannel(e, function () {
              t.onLeaveChannel(e);
            });
          },
          onLeaveChannel: function (e) {
            var t = r.a.findIndex(this.channels, { id: e });
            -1 !== t &&
              (i.a.delete(this.channels, t),
              this.$refs.mainToolbar.setChannels(this.channels),
              this.activeChannelId === e &&
                this.selectChannel(
                  this.channels[Math.max(2 === t ? 0 : t - 1, 0)].id
                ),
              (t = o.a.localUser.channels.indexOf(e)),
              -1 !== t && i.a.delete(o.a.localUser.channels, t),
              this.$refs["welcome-channel"].onUserChannelIO(),
              this.$refs["search-channel"].onUserChannelIO(),
              i.a.set(
                o.a.localUser,
                "maxNumChannelsReached",
                o.a.localUser.perks.maxNumChannels <=
                  o.a.localUser.channels.length
              ));
          },
          onUserIgnored: function (e, t) {
            var n = this;
            r.a.forEach(e.channels, function (a) {
              if (o.a.isGameChannel(a)) {
                var s = n.getChannelComponentById(a);
                s && s.onUserIgnored(e, t);
              }
            });
          },
          onSortingChanged: function () {
            var e = !0,
              t = !1,
              n = void 0;
            try {
              for (
                var a, i = s()(this.channels);
                !(e = (a = i.next()).done);
                e = !0
              ) {
                var l = a.value,
                  r = this.getChannelComponentById(l.id);
                r && r.$refs.usersList && r.$refs.usersList.rebuildUsersLists();
              }
            } catch (e) {
              (t = !0), (n = e);
            } finally {
              try {
                !e && i.return && i.return();
              } finally {
                if (t) throw n;
              }
            }
          },
          getChannelComponentById: function (e) {
            return (!o.a.isGameChannel(e) && this.$refs[e]) ||
              (o.a.isGameChannel(e) &&
                this.$refs[e] &&
                this.$refs[e].length > 0)
              ? this.$refs[e][0] || this.$refs[e]
              : null;
          },
          onUserAwayStateChanges: function (e, t, n) {
            var a = this.globalUsers[e];
            if (n) {
              var s = a.channelsAway.indexOf(n),
                l = r.a.findIndex(this.channels, { id: n });
              -1 !== l &&
                a.isLocal &&
                i.a.set(this.channels[l], "localUserIsAway", t),
                t
                  ? -1 === s && a.channelsAway.push(n)
                  : -1 !== s && i.a.delete(a.channelsAway, s);
            } else i.a.set(a, "away", t);
            if (n) {
              var o = this.getChannelComponentById(n);
              o && o.onUserAwayStateChanges(a, t, !1);
            } else {
              var c = this;
              r.a.forEach(a.channels, function (e) {
                var n = c.getChannelComponentById(e);
                n && n.onUserAwayStateChanges(a, t, !0);
              });
            }
          },
          onUserPlayingStateChanges: function (
            e,
            t,
            n,
            a,
            s,
            l,
            c,
            h,
            u,
            d,
            g
          ) {
            var v = this.globalUsers[e];
            if (v) {
              var f = { channelId: n, quarkId: a, gameId: s, port: c };
              v.isLocal &&
                ((o.a.currentMatch[t ? "initialElo" : "finalElo"] = u),
                (o.a.currentMatch.scores = g)),
                i.a.set(v, "playing", t ? f : null),
                t || r.a.isUndefined(d) || i.a.set(v.channelRank, n, d);
              var m = this.getChannelComponentById(n);
              m && (t ? m.startMatch(v, a, l, c, h) : m.endMatch(v, a));
              var p = this;
              r.a.forEach(v.channels, function (e) {
                var a = p.getChannelComponentById(e);
                a && a.onUserPlayingStateChanges(v, t, n);
              });
            }
          },
          addUserToChannel: function (e, t) {
            var n = null;
            return (
              r.a.has(this.globalUsers, e.id)
                ? ((n = this.globalUsers[e.id]),
                  -1 === n.channels.indexOf(t) && n.channels.push(t),
                  -1 !== e.channelsAway.indexOf(t) &&
                    -1 === n.channelsAway.indexOf(t) &&
                    n.channelsAway.push(t),
                  (n.channelRank[t] = e.channelRank[t] || 0))
                : ((n = e),
                  (n.channels = [t]),
                  (n.country = this.getCountry(e.country)),
                  i.a.set(
                    n,
                    "ignored",
                    -1 !== o.a.localUser.ignores.indexOf(n.id)
                  ),
                  (this.globalUsers[n.id] = n)),
              n
            );
          },
          removeUserFromChannel: function (e, t) {
            var n = this.globalUsers[e.id];
            if (n) {
              var a = r.a.indexOf(n.channels, t);
              -1 !== a &&
                (i.a.delete(n.channels, a),
                0 === n.channels.length && i.a.delete(this.globalUsers, e.id));
            }
          },
          showContextMenu: function (e) {
            var t = this;
            (this.contextMenuData = e),
              i.a.nextTick(function () {
                t.$refs.contextMenu.show(e.position, e.limitRect);
              });
          },
          closeContextMenu: function () {
            this.contextMenuData = null;
          },
          showEmojisView: function (e) {
            var t = this;
            (this.emojisData = e),
              i.a.nextTick(function () {
                t.$refs.emojis.show(e.position, e.align);
              });
          },
          closeEmojisView: function () {
            this.emojisData = null;
          },
          closeUserInfoView: function () {
            this.userInfoData = null;
          },
          onNewNotification: function (e) {
            var t = this.getChannelComponentById(e.channel.id),
              n = this;
            if (
              ((e.user = this.globalUsers[e.user.id]),
              "message" !== e.type && !t.data.localUserIsAway)
            ) {
              var a =
                "challenge" === e.type
                  ? "static/sounds/challenge.mp3"
                  : "static/sounds/notify.mp3";
              if (o.a.localUser.settings.soundNotifications) {
                this.notifySound ||
                  ((this.notifySound = new Audio()),
                  this.notifySound.addEventListener("error", function (e) {
                    4 === e.currentTarget.error.code &&
                      ((n.notifySound.src = a), n.notifySound.play());
                  }));
                var s = e.gameid ? e.gameid.replace("fc1_", "") : null;
                (this.notifySound.src = e.gameid
                  ? "static/sounds/" + s + "-challenge.mp3"
                  : a),
                  this.notifySound.play();
              }
            }
            if (
              !(
                (t.data.active && document.hasFocus()) ||
                t.data.localUserIsAway
              ) &&
              "message" !== e.type &&
              o.a.localUser.settings.desktopNotifications
            ) {
              new h.a("Fightcade", {
                body: e.message.text,
                timeout: 5,
                icon: e.gameid
                  ? "static/previews/" + e.gameid + ".png"
                  : F.a.getGravatar(e.user.gravatar, 40),
                closeOnClick: !0,
                notifyClick: function () {
                  n.gotoChatMessage(
                    e.channel.id,
                    e.message.id,
                    e.message.lineId
                  );
                },
              }).show();
            }
            if (!t.data.active) {
              var i = r.a.findIndex(this.channels, { id: e.channel.id });
              if (-1 !== i) {
                this.channels[i][o.a.notificationTypeToVar[e.type]].push({
                  messageId: e.message.id,
                  lineId: e.message.lineId,
                  user: e.user,
                  challengeId: e.challengeId,
                });
              }
              if ("message" !== e.type && !t.data.localUserIsAway) {
                var l = r.a.findIndex(this.channels, { active: !0 });
                -1 !== l &&
                  l !== i &&
                  o.a.isGameChannel(this.channels[l].id) &&
                  this.channels[l].outerNotifications.unshift({
                    type: e.type,
                    channel: e.channel,
                    message: e.message,
                    user: e.user,
                    challengeId: e.challengeId,
                    ranked: e.ranked,
                    timer: 0,
                  });
              }
            }
            this.$refs.mainToolbar.onNewNotification(e, !t.data.active);
          },
          gotoChannelByGameId: function (e) {
            this.gotoChannel(o.a.channelByGameId[e]);
          },
          gotoChannel: function (e) {
            this.getChannelComponentById(e)
              ? this.selectChannel(e)
              : this.joinChannel(e);
          },
          gotoChatMessage: function (e, t, n) {
            var a = this.getChannelComponentById(e);
            a &&
              (a.active || this.selectChannel(e), a.displayChatMessage(t, n));
          },
          declineChallenge: function (e, t, n) {
            this.removeChallengeNotifications(t, e, n, "declined");
            var a = this.getChannelComponentById(e);
            a && a.declineChallenge(t, n);
          },
          acceptChallenge: function (e, t, n, a) {
            if (!o.a.localUser.playing) {
              this.removeChallengeNotifications(t, e, n, "accepted");
              var s = this.getChannelComponentById(e);
              s && s.acceptChallenge(t, n, a);
            }
          },
          getCountry: function (e) {
            return e ? ((e.iso_code = e.iso_code.toLowerCase()), e) : "unknown";
          },
          removeChallengeNotifications: function (e, t, n, a) {
            var s = r.a.findIndex(this.channels, { id: t });
            if (-1 !== s)
              for (
                var l = this.channels[s][o.a.notificationTypeToVar.challenge],
                  c = 0;
                c < l.length;
                ++c
              )
                if (l[c].user.id === e.id && l[c].challengeId === n) {
                  i.a.delete(l, c);
                  break;
                }
            for (var h = 0; h < this.channels.length; ++h)
              if (o.a.isGameChannel(this.channels[h].id))
                for (
                  var u = this.channels[h].outerNotifications, d = 0;
                  d < u.length;
                  ++d
                )
                  if (
                    "challenge" === u[d].type &&
                    u[d].user.id === e.id &&
                    u[d].channel.id === t &&
                    u[d].message.challengeId === n
                  ) {
                    i.a.delete(u, d);
                    break;
                  }
            this.$refs.mainToolbar.updateChallengeNotification(e, t, n, a),
              this.$refs.mainToolbar.removeChallengeNotifications();
          },
          channelItemInitialized: function (e) {
            e || ++this.numChannelsInitialized,
              this.numChannelsInitialized ===
                this.channels.length - o.a.baseChannels.length &&
                ((this.channelsInitialized = !0),
                this.checkChannelsAreInitialized());
          },
          onWelcomeChannelInitialized: function () {
            (this.welcomeChannelInitialized = !0),
              this.checkChannelsAreInitialized();
          },
          onSearchChannelInitialized: function () {
            (this.searchChannelInitialized = !0),
              this.checkChannelsAreInitialized();
          },
          checkChannelsAreInitialized: function () {
            if (
              this.welcomeChannelInitialized &&
              this.searchChannelInitialized &&
              this.channelsInitialized
            ) {
              var e = this;
              r.a.delay(function () {
                e.initializingApp = !1;
              }, 500);
            }
          },
          checkPerksAvailability: function () {
            var e = o.a.localUser,
              t = !1;
            (t = e.perks.themesAvailable
              ? !(e.settings.theme in o.a.themes)
              : e.settings.theme !== o.a.themes.default.id),
              t &&
                ((e.settings.theme = o.a.themes.default.id),
                S.a.updateUser({ theme: e.settings.theme })),
              o.a.setTheme(e.settings.theme);
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(1);
      t.default = {
        name: "about-channel",
        data: function () {
          return { userRole: a.a.localUser.role };
        },
        mounted: function () {
          this.$emit("initialized");
        },
        methods: {
          onSelect: function () {},
          openPatreonChannel: function () {
            this.$emit("select-channel", "patreon-channel");
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = {
          name: "search-item",
          props: ["data"],
          methods: {
            select: function () {
              this.data.active || this.$emit("select", this.data.id);
            },
          },
        });
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = {
          name: "category-preview",
          props: ["category"],
          methods: {
            searchCategory: function (e) {
              this.$emit("select-channel", "search-channel", { category: e });
            },
            thumbnailBg: function (e) {
              return "My Favorites" === e
                ? void 0
                : "/static/categories/" + e + ".png";
            },
          },
        });
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(3),
        s = n(2),
        i = n.n(s),
        l = n(194),
        r = n.n(l),
        o = n(211),
        c = n.n(o),
        h = n(6),
        u = n(1);
      t.default = {
        name: "channel",
        props: ["data"],
        components: { Chat: r.a, UsersList: c.a },
        data: function () {
          return {
            challengesRequests: [],
            challengesRequested: [],
            notificationsUsers: [{ name: "@channel" }],
            matches: {},
            usersByName: {},
            challengeId: 1,
          };
        },
        methods: {
          userProfile: function () {
            return (
              "https://www.fightcade.com/id/" +
              encodeURIComponent(u.a.localUser.id)
            );
          },
          gameReplays: function () {
            return (
              "https://www.fightcade.com/game/" + this.data.gameid + "/replays"
            );
          },
          gameRankings: function () {
            return (
              "https://www.fightcade.com/game/" + this.data.gameid + "/rankings"
            );
          },
          gameEvents: function () {
            return (
              "https://www.fightcade.com/game/" + this.data.gameid + "/events"
            );
          },
          onJoin: function (e) {
            this.$refs.usersList.setUsers(e.users),
              this.$refs.chat.setChannelName(this.data.name),
              this.$refs.chat.addChannelMotd(e.motd, e.events),
              (this.usersByName = {});
            var t = this;
            i.a.forEach(e.users, function (e) {
              (t.usersByName[e.name] = e),
                t.notificationsUsers.push({
                  name: "@" + e.name,
                  gravatar: e.gravatar,
                });
            }),
              this.sortNotificationsUsers(),
              this.$refs.chat.setChannelNotificationUsers(
                this.notificationsUsers
              );
          },
          addUser: function (e) {
            this.$refs.usersList.addUser(e),
              this.notificationsUsers.push({
                name: "@" + e.name,
                gravatar: e.gravatar,
              }),
              (this.usersByName[e.name] = e),
              this.sortNotificationsUsers(),
              this.$refs.chat.setChannelNotificationUsers(
                this.notificationsUsers
              ),
              e.id !== u.a.localUser.id &&
                this.$refs.chat.addUserEventMessage(
                  e.name + " entered the channel"
                );
          },
          removeUser: function (e) {
            this.$refs.usersList.removeUser(e);
            var t = i.a.findIndex(this.notificationsUsers, {
              name: "@" + e.name,
            });
            -1 !== t &&
              (a.a.delete(this.notificationsUsers, t),
              this.$refs.chat.setChannelNotificationUsers(
                this.notificationsUsers
              )),
              e.name in this.usersByName &&
                a.a.delete(this.usersByName, e.name),
              e.id !== u.a.localUser.id &&
                this.$refs.chat.addUserEventMessage(
                  e.name + " left the channel"
                );
          },
          sortNotificationsUsers: function () {
            this.notificationsUsers = i.a.orderBy(
              this.notificationsUsers,
              function (e) {
                return e.name.length;
              },
              ["desc"]
            );
          },
          onChatMessage: function (e, t) {
            var n = this.$refs.chat.addChatMessage(e, t, {
                id: this.data.id,
                ranked: this.data.ranked,
              }),
              a = t;
            n.notify && (a = e.name + " mentioned you: " + a),
              this.$emit("new-notification", {
                type: n.notify ? "mention" : "message",
                user: e,
                channel: { id: this.data.id, name: this.data.name },
                message: {
                  id: n.messageInfo.id,
                  lineId: n.messageInfo.lines.length - 1,
                  text: a,
                },
              });
          },
          onChannelMessage: function (e) {
            var t = this.$refs.chat.addChannelMessage(e),
              n = e;
            this.$emit("new-notification", {
              type: "message",
              user: "Channel",
              channel: { id: this.data.id, name: this.data.name },
              message: {
                id: t.messageInfo.id,
                lineId: t.messageInfo.lines.length - 1,
                text: n,
              },
            });
          },
          displayChatMessage: function (e, t) {
            this.$refs.chat.gotoMessage(e, t);
          },
          onSelect: function () {
            this.$refs.chat.focus(),
              this.$refs.chat.scrollToBottom(),
              this.$refs.chat.manageNotificationsHelpersVisibility();
          },
          showContextMenu: function (e) {
            this.$emit("show-context-menu", e);
          },
          challengeUser: function (e, t) {
            var n = -1 !== e.channelsAway.indexOf(this.data.id),
              a = this.challengeId++;
            if (!(e.isLocal || e.away || e.playing || n))
              if (
                !i.a.isNumber(t) &&
                this.data.ranked &&
                u.a.localUser.settings.ranked &&
                e.settings.ranked
              ) {
                var s = this.$refs.chat.addRequestRankedChallengeMessage(e, a);
                this.challengesRequests.push({
                  user: e,
                  message: s.messageInfo,
                });
              } else {
                var l = this;
                this.cancelAllChallengesRequests(e, a),
                  h.a.challengeUser(e.id, this.data.id, a, t, function (n) {
                    if (200 === n.result) {
                      if (
                        !i.a.find(l.challengesRequests, function (t) {
                          return (
                            t.user.id === e.id && t.message.challengeId === a
                          );
                        })
                      ) {
                        var s = l.$refs.chat.addRequestChallengeMessage(
                          e,
                          a,
                          t
                        );
                        l.challengesRequests.push({
                          user: e,
                          message: s.messageInfo,
                        });
                      }
                    } else l.$refs.chat.addChallengeErrorMessage(e, a, t, n.error);
                  });
              }
          },
          userChallenged: function (e, t, n) {
            if (
              !i.a.find(this.challengesRequested, function (n) {
                return n.user.id === e.id && n.message.challengeId === t;
              })
            ) {
              var a = this.$refs.chat.addChallengeRequestedMessage(e, t, n);
              this.challengesRequested.push({
                user: e,
                message: a.messageInfo,
              }),
                this.$emit("new-notification", {
                  type: "challenge",
                  user: e,
                  challengeId: t,
                  ranked: n,
                  gameid: this.data.gameid,
                  channel: { id: this.data.id, name: this.data.name },
                  message: {
                    id: a.messageInfo.id,
                    lineId: a.messageInfo.lines.length - 1,
                    text: "You have been challenged by " + e.name,
                  },
                });
            }
          },
          showEmojisView: function (e) {
            this.$emit("show-emojis-view", e);
          },
          gotoChannelByGameId: function (e) {
            this.$emit("goto-channel-by-gameid", e);
          },
          ignoreUser: function (e, t) {
            var n = this.usersByName[e];
            if ((n && a.a.set(n, "ignored", t), h.a.ignoreUser(e, t), t))
              u.a.localUser.ignores.push(e);
            else {
              var s = i.a.findIndex(u.a.localUser.ignores, function (t) {
                return t === e;
              });
              -1 !== s && a.a.delete(u.a.localUser.ignores, s);
            }
            n && this.$emit("on-user-ignored", n, t);
          },
          gotoChatMessage: function (e, t, n) {
            this.$emit("goto-chat-message", e, t, n);
          },
          challengeCancelled: function (e, t) {
            this.removeChallengeRequested(e.id, t, "cancelled");
          },
          challengeDeclined: function (e, t) {
            this.removeChallengeRequest(e.id, t, "declined");
          },
          challengeAccepted: function (e, t) {
            this.removeChallengeRequest(e.id, t, "accepted");
          },
          cancelChallenge: function (e, t) {
            this.removeChallengeRequest(e.id, t, "cancelled"),
              h.a.cancelChallenge(e.id, this.data.id, t);
          },
          cancelAllChallengesRequests: function (e, t) {
            var n = this,
              a = i.a.clone(this.challengesRequests);
            i.a.forEach(a, function (a) {
              (e && a.message.opponent.name !== e.name) ||
                (a.message.challengeId !== t &&
                  n.cancelChallenge(a.user, a.message.challengeId));
            });
          },
          declineChallenge: function (e, t) {
            this.removeChallengeRequested(e.id, t, "declined"),
              h.a.declineChallenge(e.id, this.data.id, t);
          },
          declineAllChallengesRequested: function () {
            var e = this,
              t = i.a.clone(this.challengesRequested);
            i.a.forEach(t, function (t) {
              e.declineChallenge(t.user, t.message.challengeId);
            });
          },
          rankedChallange: function (e, t, n, a) {
            this.cancelAllChallengesRequests(e, t),
              h.a.challengeUser(e.id, this.data.id, t, n, function () {
                a();
              });
          },
          acceptChallenge: function (e, t, n) {
            this.removeChallengeRequested(e.id, t, "accepted"),
              h.a.acceptChallenge(e.id, this.data.id, t, n);
          },
          stateChallenge: function (e, t, n, a) {
            var s = i.a.findIndex(this.challengesRequested, function (n) {
              return n.user.id === e.id && n.message.challengeId === t;
            });
            -1 !== s &&
              ((this.challengesRequested[s].message.ranked = n),
              (this.challengesRequested[s].message.ranked = a));
          },
          declineChallengeEvent: function (e, t) {
            this.$emit("decline-challenge", this.data.id, e, t);
          },
          acceptChallengeEvent: function (e, t, n) {
            this.$emit("accept-challenge", this.data.id, e, t, n);
          },
          declineOuterChallenge: function (e, t, n) {
            this.$emit("decline-challenge", e, t, n);
          },
          acceptOuterChallenge: function (e, t, n, a) {
            this.$emit("accept-challenge", e, t, n, a);
          },
          removeChallengeRequest: function (e, t, n) {
            var s = i.a.findIndex(this.challengesRequests, function (n) {
              return n.user.id === e && n.message.challengeId === t;
            });
            -1 !== s &&
              (this.$refs.chat.changeMessageState(
                this.challengesRequests[s].message.id,
                n
              ),
              a.a.delete(this.challengesRequests, s));
          },
          removeChallengeRequested: function (e, t, n) {
            var s = i.a.findIndex(this.challengesRequested, function (n) {
              return n.user.id === e && n.message.challengeId === t;
            });
            -1 !== s &&
              (this.$refs.chat.changeMessageState(
                this.challengesRequested[s].message.id,
                n
              ),
              a.a.delete(this.challengesRequested, s));
          },
          startMatch: function (e, t, n, s, i) {
            if (this.matches[t])
              a.a.set(this.matches[t], 0 === n ? "player1" : "player2", e);
            else {
              var l = {
                player1:
                  0 === n
                    ? e
                    : {
                        name: "<offline>",
                        country: {},
                        settings: { ranked: !1 },
                      },
                player2:
                  1 === n
                    ? e
                    : {
                        name: "<offline>",
                        country: {},
                        settings: { ranked: !1 },
                      },
                quarkId: t,
                playerId: n,
                port: s,
                ranked: i,
                numSpectators: 0,
              };
              a.a.set(this.matches, t, l),
                this.$refs.usersList.addMatch(this.matches[t]);
            }
          },
          endMatch: function (e, t) {
            e.isLocal &&
              (window.location.assign(h.a.getEndMatchUri()),
              this.$refs.chat.addEndgameMessage(
                u.a.currentMatch,
                h.a.getReplayUrl(this.data.emulator, this.data.gameid, t)
              ),
              (u.a.playing = !1)),
              this.matches[t] &&
                (this.$refs.usersList.removeMatch(this.matches[t]),
                (this.matches[t] = null));
          },
          playAlone: function () {
            window.location.assign(
              h.a.getPlayAloneUri(this.data.emulator, this.data.gameid)
            );
          },
          playTraining: function () {
            window.location.assign(
              h.a.getPlayTrainingUri(this.data.emulator, this.data.gameid)
            );
          },
          leaveChannel: function () {
            this.$emit("leave-channel", this.data.id);
          },
          clearChat: function () {
            this.$refs.chat.clearChat();
          },
          onUserAwayStateChanges: function (e, t, n) {
            if (
              e.name in this.usersByName &&
              (this.$refs.usersList.rebuildUsersLists(),
              e.id !== u.a.localUser.id)
            ) {
              var a = t ? " is now away" : " is now available";
              this.$refs.chat.addUserEventMessage(e.name + a);
            }
          },
          onUserPlayingStateChanges: function (e, t, n) {
            if (
              e.name in this.usersByName &&
              (this.$refs.usersList.rebuildUsersLists(),
              e.id !== u.a.localUser.id && this.data.id === n)
            ) {
              var a = t ? " is playing" : " is not playing";
              this.$refs.chat.addUserEventMessage(e.name + a);
            }
          },
          onUserIgnored: function (e, t) {
            this.$refs.usersList.rebuildUsersLists();
          },
          onQuarkStats: function (e, t) {
            this.matches[e] && a.a.set(this.matches[e], "numSpectators", t);
          },
          onSortingChange: function () {
            this.$emit("sorting-changed");
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(3),
        s = n(2),
        i = n.n(s),
        l = n(6);
      t.default = {
        name: "channel-item",
        props: ["data"],
        data: function () {
          return {
            channelItemThumbnail: {
              backgroundImage:
                "url(/static/previews/" +
                this.data.gameid.replace("fc1_", "") +
                ".png)",
            },
          };
        },
        mounted: function () {
          this.$emit("channel-item-initialized");
        },
        computed: {
          truncatedGameId: function () {
            return i.a.truncate(this.data.id, { length: 32 });
          },
          muteChannelTitle: function () {
            return this.data.localUserIsAway
              ? "Unmute channel"
              : "Mute channel";
          },
        },
        methods: {
          select: function () {
            this.data.active ||
              (this.$emit("select-channel", this.data.id),
              this.$emit("show-tooltip", null, null));
          },
          showTooltip: function () {
            this.data.active ||
              this.$emit(
                "show-tooltip",
                this.data.name,
                this.$refs.tooltip.getBoundingClientRect().bottom
              );
          },
          hideTooltip: function () {
            this.$emit("show-tooltip", null, null);
          },
          leaveChannel: function () {
            this.$emit("leave-channel", this.data.id);
          },
          onChannelAway: function () {
            a.a.set(this.data, "localUserIsAway", !this.data.localUserIsAway),
              l.a.setAway(this.data.localUserIsAway, this.data.id);
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(1);
      t.default = {
        name: "channel-preview",
        props: ["channel"],
        data: function () {
          return { userRole: a.a.localUser.role };
        },
        methods: {
          joinChannel: function (e) {
            this.$emit("join-channel", e.name);
          },
          newChannel: function (e) {
            this.$emit("new-channel", e.name);
          },
          delChannel: function (e) {
            this.$emit("del-channel", e.name);
          },
          favChannel: function (e) {
            (e.isFavorite = !e.isFavorite),
              this.$emit("fav-channel", e.name, e.isFavorite);
          },
          openPatreonChannel: function () {
            this.$emit("select-channel", "patreon-channel");
          },
          getNumUsers: function (e) {
            return e.clients || 0;
          },
          getChannelName: function (e) {
            return e;
          },
          channelIsVisible: function (e) {
            return e.isFavorite;
          },
          channelIsDisabled: function (e) {
            return (
              e.alreadyJoined ||
              a.a.localUser.maxNumChannelsReached ||
              a.a.localUser.role < e.available_for
            );
          },
          channelIsAvaibleForUser: function (e) {
            return (
              a.a.localUser.role >= e.available_for &&
              !a.a.localUser.maxNumChannelsReached
            );
          },
          newChannelIsAvaibleForUser: function (e) {
            return (
              a.a.localUser.role >= e.available_for &&
              a.a.localUser.lobbyChannels.length <
                a.a.localUser.perks.maxNumLobbies &&
              !e.owner
            );
          },
          delChannelIsAvaibleForUser: function (e) {
            return e.owner === a.a.localUser.name;
          },
          getReasonChannelNotAvailable: function (e) {
            return a.a.localUser.role < e.available_for
              ? "Feature available only to patrons."
              : a.a.localUser.maxNumChannelsReached
              ? "Maximum amount of concurrent channels reached."
              : "Can't join this channel.";
          },
          channelTitle: function (e, t) {
            if (t && e.alreadyJoined) return "You're already on this channel";
            var n;
            return (n = e.system ? " - " + e.system : ""), e.name + n;
          },
          channelIsHack: function (e) {
            var t = e.name.toUpperCase();
            return (
              t.indexOf("(HACK") > 0 ||
              t.indexOf("[HACK") > 0 ||
              t.indexOf("HACK)") > 0 ||
              t.indexOf("HACK]") > 0 ||
              t.indexOf(" HACK") > 0 ||
              t.indexOf("HACK ") > 0
            );
          },
          canFavoriteChannel: function (e) {
            return (
              e.isFavorite ||
              (a.a.localUser.role >= e.available_for &&
                a.a.localUser.favoritesChannels.length <
                  a.a.localUser.perks.maxNumFavorites &&
                !e.owner)
            );
          },
          lazyThumbnailBg: function (e) {
            return "/static/previews/" + e.gameid.replace("fc1_", "") + ".png";
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(1);
      t.default = {
        name: "event-preview",
        props: ["event"],
        methods: {
          joinChannel: function (e) {
            this.$emit("join-channel", e.name);
          },
          newChannel: function (e) {
            this.$emit("new-channel", e.name);
          },
          delChannel: function (e) {
            this.$emit("del-channel", e.name);
          },
          favChannel: function (e) {
            (e.isFavorite = !e.isFavorite),
              this.$emit("fav-channel", e.name, e.isFavorite);
          },
          openPatreonChannel: function () {
            this.$emit("select-channel", "patreon-channel");
          },
          channelIsDisabled: function (e) {
            return (
              e.alreadyJoined ||
              a.a.localUser.maxNumChannelsReached ||
              a.a.localUser.role < e.available_for
            );
          },
          channelIsAvaibleForUser: function (e) {
            return (
              a.a.localUser.role >= e.available_for &&
              !a.a.localUser.maxNumChannelsReached
            );
          },
          getReasonChannelNotAvailable: function (e) {
            return a.a.localUser.role < e.available_for
              ? "Feature available only to patrons."
              : a.a.localUser.maxNumChannelsReached
              ? "Maximum amount of concurrent channels reached."
              : "Can't join this channel.";
          },
          eventThumbnail: function (e) {
            var t = "/static/previews/" + e.gameid.replace("fc1_", "") + ".png";
            return e.image || t;
          },
          eventInfo: function (e) {
            return e.name;
          },
          eventDate: function (e) {
            return new Date(e.date).toLocaleString() + " - " + e.region;
          },
          infoButtonClicked: function (e) {
            window.open(e.link, "_blank");
          },
          infoButtonTitle: function (e) {
            return e.link;
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(1),
        s = n(52),
        i = n.n(s);
      t.default = {
        name: "paginated-list",
        props: ["noItemsInfo", "hideFooter", "favorites", "lobbies"],
        components: { ChannelPreview: i.a },
        data: function () {
          return {
            fetchingData: !1,
            title: "",
            channels: [],
            totalChannels: 0,
            prevButtonAvailable: !1,
            nextButtonAvailable: !1,
            numChannelsPerPage: 50,
            firstChannelVisible: 0,
            userRole: a.a.localUser.role,
          };
        },
        methods: {
          startFetching: function () {
            this.fetchingData = !0;
          },
          endFetching: function (e, t, n, a) {
            (this.firstChannelVisible = n * this.numChannelsPerPage),
              (this.title = e),
              (this.totalChannels = a),
              (this.prevButtonAvailable = n > 0),
              (this.nextButtonAvailable =
                this.firstChannelVisible + this.numChannelsPerPage < a),
              (this.channels = t),
              (this.fetchingData = !1);
          },
          getNumUsers: function (e) {
            return e.clients || 0;
          },
          channelIsVisible: function (e) {
            return (
              (!this.favorites || e.isFavorite) &&
              (!this.lobbies || e.owner === a.a.localuser.name)
            );
          },
          joinChannel: function (e) {
            this.$emit("join-channel", e);
          },
          newChannel: function (e) {
            this.$emit("new-channel", e);
          },
          delChannel: function (e) {
            this.$emit("del-channel", e);
          },
          favChannel: function (e, t) {
            this.$emit("fav-channel", e, t);
          },
          selectChannel: function (e, t) {
            this.$emit("select-channel", e, t);
          },
          gotoPageOffset: function (e) {
            ((e > 0 && this.nextButtonAvailable) ||
              (e < 0 && this.prevButtonAvailable)) &&
              this.$emit("goto-page-offset", e);
          },
          channelIsDisabled: function (e) {
            return (
              e.alreadyJoined ||
              a.a.localUser.maxNumChannelsReached ||
              a.a.localUser.role < e.available_for
            );
          },
          channelIsAvaibleForUser: function (e) {
            return (
              !a.a.localUser.maxNumChannelsReached &&
              a.a.localUser.role >= e.available_for
            );
          },
          newChannelIsAvaibleForUser: function (e) {
            return (
              !a.a.localUser.maxNumChannelsReached &&
              a.a.localUser.role >= a.a.userRole.premium &&
              !e.owner &&
              a.a.localUser.lobbiesChannels.length <
                a.a.localUser.maxLobbiesChannels
            );
          },
          delChannelIsAvaibleForUser: function (e) {
            return e.owner === a.a.localUser.name;
          },
          getReasonChannelNotAvailable: function (e) {
            return a.a.localUser.role < e.available_for
              ? "Can't join this channel, feature available only to patrons."
              : a.a.localUser.maxNumChannelsReached
              ? "Can't join this channel, maximum amount of concurrent channels reached."
              : "Can't join this channel.";
          },
          channelTitle: function (e, t) {
            if (t && e.alreadyJoined) return "You're already on this channel";
            var n;
            return (n = e.system ? " - " + e.system : ""), e.name + n;
          },
          footerIsVisible: function () {
            return this.channels.length > 0 && !this.hideFooter;
          },
          lazyThumbnailBg: function (e) {
            return "/static/previews/" + e.gameid.replace("fc1_", "") + ".png";
          },
        },
        computed: {
          pageRange: function () {
            return (
              this.firstChannelVisible +
              1 +
              "-" +
              Math.min(
                this.firstChannelVisible + this.numChannelsPerPage,
                this.totalChannels
              )
            );
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = {
          name: "patreon-channel",
          mounted: function () {
            this.$emit("initialized");
          },
          methods: { onSelect: function () {} },
        });
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(2),
        s = n.n(a),
        i = n(3),
        l = n(1),
        r = n(6),
        o = n(185),
        c = n.n(o);
      t.default = {
        name: "search-channel",
        components: { PaginatedList: c.a },
        data: function () {
          return {
            page: 0,
            channels: [],
            favorites: !1,
            lobbies: !1,
            textFilter: "",
            rankedFilter: 0,
            genreFilter: 0,
            yearFilter: 0,
            systemFilter: 0,
            openedFilters: !1,
            genres: [],
            years: [],
            systems: [],
            rankedOptions: ["All", "Ranked", "Unranked"],
            noItemsInfo: {
              emoji: "(╯°□°)╯︵ ┻━┻",
              text: "No game channels found.",
            },
          };
        },
        mounted: function () {
          this.$emit("initialized"),
            (this.debouncedRequestChannels = s.a.debounce(
              this.requestChannels,
              300
            ));
        },
        methods: {
          joinChannel: function (e) {
            this.$emit("join-channel", e);
          },
          newChannel: function (e) {
            this.$emit("new-channel", e);
          },
          delChannel: function (e) {
            this.$emit("del-channel", e);
          },
          favChannel: function (e, t) {
            this.$emit("fav-channel", e, t);
          },
          selectChannel: function (e, t) {
            this.$emit("select-channel", e, t);
          },
          gotoPageOffset: function (e) {
            this.requestChannels(this.page + e);
          },
          canFilter: function () {
            return !0;
          },
          getPlaceholder: function () {
            return this.favorites ? "Search favorites" : "Search games";
          },
          onSelect: function (e) {
            var t = this;
            (this.genres = l.a.filtersOptions.genres),
              (this.years = l.a.filtersOptions.years),
              (this.systems = l.a.filtersOptions.systems),
              (this.page = 0),
              (this.favorites = !1),
              (this.textFilter = ""),
              (this.genreFilter = 0),
              (this.yearFilter = 0),
              (this.systemFilter = 0),
              (this.rankedFilter = 0),
              e &&
                ((this.textFilter = e.textFilter || this.textFilter),
                (this.genreFilter = e.genreFilter || this.genreFilter),
                (this.yearFilter = e.yearFilter || this.yearFilter),
                (this.systemFilter = e.systemFilter || this.systemFilter),
                (this.rankedFilter = e.rankedFilter || this.rankedFilter),
                e.category &&
                  ((this.favorites = "My Favorites" === e.category),
                  (this.genreFilter =
                    this.genres.indexOf(e.category) > 0
                      ? this.genres.indexOf(e.category)
                      : 0),
                  (this.yearFilter =
                    this.years.indexOf(e.category) > 0
                      ? this.years.indexOf(e.category)
                      : 0),
                  (this.systemFilter =
                    this.systems.indexOf(e.category) > 0
                      ? this.systems.indexOf(e.category)
                      : 0))),
              this.requestChannels(0),
              i.a.nextTick(function () {
                t.$refs.textFilter.focus();
              });
          },
          onUserChannelIO: function () {
            s.a.forEach(this.channels, function (e) {
              (e.isFavorite =
                -1 !== l.a.localUser.favoritesChannels.indexOf(e.name)),
                (e.alreadyJoined =
                  -1 !== l.a.localUser.channels.indexOf(e.name));
            });
          },
          requestChannels: s.a.throttle(function (e) {
            var t = this.favorites,
              n = this.textFilter ? this.textFilter : null,
              a = this.genreFilter > 0 ? this.genres[this.genreFilter] : null,
              i = this.yearFilter > 0 ? this.years[this.yearFilter] : null,
              o =
                this.systemFilter > 0 ? this.systems[this.systemFilter] : null,
              c = this.rankedFilter > 0 ? 1 === this.rankedFilter : null,
              h = this;
            this.$refs.paginatedList.startFetching(),
              (this.channels = []),
              (this.page = e || 0),
              r.a.listChannels(this.page, n, a, i, o, c, t, function (e) {
                var t = h.favorites
                  ? "Search Favorites"
                  : a || i || o || c || n
                  ? "Search Results"
                  : "All Games";
                s.a.forEach(e.channels, function (e) {
                  (e.isFavorite =
                    -1 !== l.a.localUser.favoritesChannels.indexOf(e.name)),
                    (e.alreadyJoined =
                      -1 !== l.a.localUser.channels.indexOf(e.name));
                }),
                  (h.channels = e.channels),
                  h.$refs.paginatedList.endFetching(
                    t,
                    h.channels,
                    e.page,
                    e.totalChannels
                  );
              });
          }, 300),
          toggleChannelActions: function () {
            this.channelActionsVisible = !this.channelActionsVisible;
          },
          toggleFilters: function () {
            this.openedFilters = !this.openedFilters;
          },
          clearFilters: function () {
            (this.yearFilter = 0),
              (this.genreFilter = 0),
              (this.systemFilter = 0),
              (this.rankedFilter = 0),
              this.requestChannels(0);
          },
        },
        watch: {
          textFilter: function (e) {
            this.debouncedRequestChannels(0);
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(2),
        s = n.n(a),
        i = n(3),
        l = n(1),
        r = n(6),
        o = n(189),
        c = n.n(o);
      t.default = {
        name: "welcome-channel",
        components: { WelcomeList: c.a },
        data: function () {
          return {
            fetchingData: !1,
            textFilter: "",
            openedFilters: !1,
            genres: [],
            years: [],
            systems: [],
            rankedOptions: ["All", "Ranked", "Unranked"],
            results: [],
          };
        },
        mounted: function () {
          this.$emit("initialized"),
            (this.debouncedRequestWelcome = s.a.debounce(
              this.requestWelcome,
              300
            )),
            (this.debouncedTextFilter = s.a.debounce(this.onTextFilter, 500));
        },
        methods: {
          requestWelcome: s.a.throttle(function () {
            var e = this;
            (this.fetchingData = !0),
              r.a.listWelcome(function (t) {
                s.a.forEach(t.results, function (e) {
                  s.a.forEach(e.events, function (e) {
                    e.channel &&
                      ((e.channel.isFavorite =
                        -1 !==
                        l.a.localUser.favoritesChannels.indexOf(
                          e.channel.name
                        )),
                      (e.channel.alreadyJoined =
                        -1 !== l.a.localUser.channels.indexOf(e.channel.name)));
                  }),
                    s.a.forEach(e.channels, function (e) {
                      (e.isFavorite =
                        -1 !== l.a.localUser.favoritesChannels.indexOf(e.name)),
                        (e.alreadyJoined =
                          -1 !== l.a.localUser.channels.indexOf(e.name));
                    });
                }),
                  (e.results = t.results),
                  (e.fetchingData = !1);
              });
          }, 300),
          onSelect: function () {
            (this.textFilter = ""),
              (this.genres = l.a.filtersOptions.genres),
              (this.years = l.a.filtersOptions.years),
              (this.systems = l.a.filtersOptions.systems),
              (this.openedFilters = !1),
              this.requestWelcome();
            var e = this;
            i.a.nextTick(function () {
              e.$refs.textFilter.focus();
            });
          },
          onUserChannelIO: function () {},
          joinChannel: function (e) {
            this.$emit("join-channel", e);
          },
          newChannel: function (e) {
            this.$emit("new-channel", e);
          },
          delChannel: function (e) {
            this.$emit("del-channel", e), this.requestWelcome();
          },
          favChannel: function (e, t) {
            this.$emit("fav-channel", e, t);
          },
          selectChannel: function (e, t) {
            this.$emit("select-channel", e, t);
          },
          onTextFilter: function (e) {
            var t = { textFilter: e };
            this.$emit("select-channel", "search-channel", t);
          },
          onChangeFilter: function () {
            var e = {
              genreFilter: this.$refs.genreFilter.selectedIndex,
              yearFilter: this.$refs.yearFilter.selectedIndex,
              systemFilter: this.$refs.systemFilter.selectedIndex,
              rankedFilter: this.$refs.rankedFilter.selectedIndex,
            };
            this.$emit("select-channel", "search-channel", e);
          },
          toggleFilters: function () {
            this.openedFilters = !this.openedFilters;
          },
        },
        watch: {
          textFilter: function (e) {
            e && e.length >= 3 && this.debouncedTextFilter(e);
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(52),
        s = n.n(a),
        i = n(181),
        l = n.n(i),
        r = n(184),
        o = n.n(r);
      t.default = {
        name: "welcome-list",
        props: ["title", "channels", "events", "categories", "grid"],
        components: {
          ChannelPreview: s.a,
          CategoryPreview: l.a,
          EventPreview: o.a,
        },
        methods: {
          joinChannel: function (e) {
            this.$emit("join-channel", e);
          },
          newChannel: function (e) {
            this.$emit("new-channel", e);
          },
          delChannel: function (e) {
            this.$emit("del-channel", e);
          },
          favChannel: function (e, t) {
            this.$emit("fav-channel", e, t);
          },
          selectChannel: function (e, t) {
            this.$emit("select-channel", e, t);
          },
          welcomeListGrid: function (e) {
            return e.length > 4 ? "welcomeListGrid" : "welcomeListGridBig";
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = { name: "bot-message", props: ["data"] });
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = {
          name: "challenge-error-message",
          props: ["data"],
          methods: {},
          computed: {
            message: function () {
              switch (this.data.error) {
                case "too many requests":
                  return "Challenge not sent. Please stop spamming.";
                case "cant challenge user":
                  return (
                    "Can't challenge user " +
                    this.data.opponent.name +
                    " at this moment."
                  );
                case "cant challenge region":
                  return (
                    "User " +
                    this.data.opponent.name +
                    " doesn't accept long distance matches with high ping."
                  );
                case "cant challenge wifi":
                  return (
                    "User " +
                    this.data.opponent.name +
                    " doesn't accept Wifi/VPN matches."
                  );
              }
              return "";
            },
          },
        });
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(5),
        s = n(1);
      t.default = {
        name: "challenge-requested-message",
        props: ["data", "channel"],
        methods: {
          modifyChallenge: function (e) {
            this.$emit(
              e + "-challenge",
              this.data.opponent,
              this.data.challengeId,
              this.data.ranked
            );
          },
          isVisible: function (e) {
            return a.a.elementIsVisible(this.$refs.line, e);
          },
          scrollTo: function () {
            this.$refs.line.scrollIntoView(!0);
          },
          onChallengeChangesState: function (e) {
            (this.data.state = e),
              this.$emit(
                "state-challenge",
                this.data.opponent,
                this.data.challengeId,
                this.data.ranked,
                this.data.state
              );
          },
        },
        computed: {
          pingSrc: function () {
            return s.a.getPingSrc(this.data.opponent);
          },
          pingTitle: function () {
            return s.a.getPingTitle(this.data.opponent);
          },
          flagSrc: function () {
            return (
              "static/flags/" +
              (this.data.opponent.country.iso_code || "unknown") +
              ".png"
            );
          },
          rankSrc: function () {
            return (
              "static/ranks/rank" +
              (this.data.opponent.channelRank[this.channel.id] || 0) +
              ".png"
            );
          },
          message: function () {
            switch (this.data.state) {
              case "active":
                return "You have been challenged!";
              case "cancelled":
                return (
                  "The challenge was cancelled by " + this.data.opponent.name
                );
              case "declined":
                return (
                  "You have rejected the challenge from " +
                  this.data.opponent.name
                );
              case "accepted":
                return "Let's play with " + this.data.opponent.name + "!";
            }
            return "";
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(5);
      t.default = {
        name: "channel-message",
        props: ["data"],
        methods: {
          timeInfo: function (e) {
            return a.a.formatTime(e);
          },
          onLineBlockClick: function (e) {
            -1 !== e.class.indexOf("link") &&
              window.open(e.href || e.text, "_blank");
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(3),
        s = n(2),
        i = n.n(s),
        l = n(1),
        r = n(195),
        o = n.n(r),
        c = n(193),
        h = n.n(c),
        u = n(197),
        d = n.n(u),
        g = n(190),
        v = n.n(g),
        f = n(196),
        m = n.n(f),
        p = n(191),
        C = n.n(p),
        _ = n(199),
        k = n.n(_),
        y = n(200),
        w = n.n(y),
        b = n(192),
        x = n.n(b),
        M = n(198),
        I = n.n(M),
        U = n(201),
        $ = n.n(U),
        A = n(5),
        S = n(6),
        F = n(58),
        N = {
          unseenMessages: { type: "message", title: "New messages" },
          unseenMentions: { type: "mention", title: "New mentions" },
          unseenChallenges: { type: "challenge", title: "New challenges" },
        };
      t.default = {
        name: "chat",
        props: ["channel", "usersByName"],
        data: function () {
          return {
            channelName: "",
            messages: [],
            visibleMessages: [],
            messageIdx: 1,
            inputText: "",
            matchString: "",
            matchActiveIdx: -1,
            matchesList: [],
            matchType: null,
            notificationUsers: [],
            notificationsHelpers: [],
            autoscroll: !0,
            ignoreNextScrollEvent: !1,
            pauseOuterNotificationsTimer: !1,
            prevMousePos: { x: -1, y: -1 },
          };
        },
        components: {
          ChatMessage: o.a,
          ChannelMessage: h.a,
          MotdMessage: d.a,
          BotMessage: v.a,
          EndgameMessage: m.a,
          ChallengeErrorMessage: C.a,
          RequestChallengeMessage: k.a,
          RequestRankedChallengeMessage: w.a,
          ChallengeRequestedMessage: x.a,
          RawMessage: I.a,
          TerminalMessage: $.a,
        },
        computed: {
          channelBg: function () {
            return {
              backgroundImage:
                "url(/static/ui/scanlines.png), url(/static/previews/" +
                this.channel.gameid.replace("fc1_", "") +
                ".png)",
            };
          },
          matchTitle: function () {
            return (
              ({ user: "Users", channel: "Channels", command: "Commands" }[
                this.matchType
              ] || "") + " matching"
            );
          },
          outerNotifications: function () {
            return this.channel.outerNotifications.slice(0, 5);
          },
        },
        mounted: function () {
          var e = this;
          this.timer = setInterval(function () {
            if (
              !e.pauseOuterNotificationsTimer &&
              e.channel.outerNotifications.length > 0
            )
              for (
                var t = e.channel.outerNotifications.length - 1;
                t >= 0;
                --t
              ) {
                var n = e.channel.outerNotifications[t];
                (n.timer += 1),
                  n.timer >= 5 && a.a.delete(e.channel.outerNotifications, t);
              }
          }, 1e3);
        },
        beforeDestroy: function () {
          clearInterval(this.timer);
        },
        methods: {
          setChannelName: function (e) {
            this.channelName = e;
          },
          setChannelNotificationUsers: function (e) {
            this.notificationUsers = e;
          },
          focus: function () {
            var e = this;
            a.a.nextTick(function () {
              e.$refs.input.focus();
            });
          },
          manageNotificationsHelpersVisibility: function () {
            var e = this;
            i.a.defer(
              function () {
                (e.notificationsHelpers = []),
                  i.a.forEach(N, function (t, n) {
                    if (e.channel[n].length > 0) {
                      var s = e.channel[n][0].messageId;
                      e.$refs[s] && e.$refs[s].length > 0
                        ? a.a.nextTick(function () {
                            e.$refs[s][0].isVisible(
                              e.$refs.chatWrapper,
                              e.channel[n][0].lineId
                            )
                              ? (e.channel[n] = [])
                              : e.notificationsHelpers.push(t);
                          })
                        : e.messages.find(function (e) {
                            return e.id === s;
                          }) && e.notificationsHelpers.push(t);
                    }
                  });
              },
              this.autoscroll ? 5 : 0
            );
          },
          changeMessageState: function (e, t) {
            this.$refs[e] &&
              this.$refs[e].length > 0 &&
              this.$refs[e][0].onChallengeChangesState(t);
          },
          gotoMessage: function (e, t) {
            var n = this;
            if ((this.messages.length, this.visibleMessages.length, 1))
              a.a.nextTick(function () {
                n.$refs[e] && n.$refs[e][0].scrollTo(t);
              });
            else {
              var s = Math.min(e - 1, 50),
                i = Math.min(100 - s, this.messages.length - e);
              (this.visibleMessages = this.messages
                .slice(e - s - 1, e - s + s)
                .concat(this.messages.slice(e, e + i))),
                a.a.nextTick(function () {
                  n.$refs[e][0].$el.scrollIntoView({
                    block: "start",
                    behaviour: "instant",
                  }),
                    a.a.nextTick(function () {
                      n.$refs[e] && n.$refs[e][0].scrollTo(t);
                    });
                });
            }
          },
          onMessageSent: function (e, t) {
            this.$refs[e] &&
              this.$refs[e][0].onSent &&
              this.$refs[e][0].onSent(t);
          },
          addChannelMotd: function (e, t) {
            return (
              (this.motd = e),
              (this.events = t),
              this.createMotd({
                author: { name: "motd" },
                motd: e,
                events: t,
                type: "motd",
              })
            );
          },
          addChannelMessage: function (e) {
            return this.createMessage({
              author: { name: "channel" },
              message: e,
              type: "channel",
            });
          },
          addChatMessage: function (e, t, n, a) {
            return this.createMessage(
              { author: e, message: t, channel: n, type: "chat" },
              a
            );
          },
          addBotMessage: function (e) {
            return this.createMessage({
              author: { name: "fcbot" },
              message: e,
              type: "bot",
            });
          },
          addEndgameMessage: function (e, t) {
            var n = {
              author: { name: "channel" },
              endgame: {
                name: l.a.localUser.name,
                opponent: e.opponent,
                ranked: e.ranked,
                playerId: e.playerId,
                scores: e.scores,
                initialElo: e.initialElo,
                finalElo: e.finalElo,
                replayUrl: this.channel.spectators ? t : void 0,
              },
              type: "endgame",
            };
            this.addMessage(n), this.scrollToBottom();
          },
          addTerminalMessage: function (e) {
            var t = {
              author: { name: "terminal" },
              type: "terminal",
              lines: i.a.isArray(e) ? e : [e],
            };
            this.addMessage(t), this.scrollToBottom();
          },
          addUserEventMessage: function (e) {
            l.a.localUser.settings.userEventsNotifications &&
              this.addBotMessage(e);
          },
          addChallengeErrorMessage: function (e, t, n, a) {
            return this.createMessage({
              author: { name: "channel" },
              type: "challengeError",
              message: "INTERNAL_MSG_USED",
              opponent: e,
              challengeId: t,
              ranked: n,
              error: a,
            });
          },
          addRequestChallengeMessage: function (e, t, n) {
            return this.createMessage({
              author: { name: "channel" },
              type: "requestChallenge",
              message: "INTERNAL_MSG_USED",
              opponent: e,
              challengeId: t,
              ranked: n,
              state: "active",
            });
          },
          addRequestRankedChallengeMessage: function (e, t) {
            return this.createMessage({
              author: { name: "channel" },
              type: "requestRankedChallenge",
              message: "INTERNAL_MSG_USED",
              opponent: e,
              challengeId: t,
              ranked: 0,
              state: "challenging",
            });
          },
          addChallengeRequestedMessage: function (e, t, n) {
            return this.createMessage({
              author: { name: "channel" },
              type: "challengeRequested",
              message: "INTERNAL_MSG_USED",
              opponent: e,
              challengeId: t,
              ranked: n,
              state: "active",
            });
          },
          addMessage: function (e) {
            if ((this.messages.push(e), this.autoscroll, 1))
              for (; this.messages.length > 400; ) this.messages.shift();
            else
              this.messages.length > 100 && this.visibleMessages.shift(),
                this.visibleMessages.push(e);
          },
          createMotd: function (e) {
            var t = this.parseMessage(e.author, e.motd),
              n = new Date(),
              a = i.a.clone(e);
            return (
              (a.id = this.messageIdx++),
              (a.lines = [
                {
                  type: e.type,
                  time: n,
                  blocks: this.createTextBlocks(t.message),
                },
              ]),
              (a.events = e.events),
              this.addMessage(a),
              { messageInfo: this.messages[this.messages.length - 1] }
            );
          },
          createMessage: function (e, t) {
            (e.message = e.message
              .replace(/_\*/g, "_ *")
              .replace(/\*_/g, "* _")),
              (e.message = e.message.replace(/(?:\\n)/g, "\n"));
            var n = this.parseMessage(e.author, e.message, t),
              s = new Date(),
              l =
                this.messages.length > 0
                  ? this.messages[this.messages.length - 1]
                  : {};
            if (
              -1 !== ["channel", "chat"].indexOf(e.type) &&
              l.author &&
              e.author.name === l.author.name
            )
              l.lines.push({
                time: s,
                blocks: this.createTextBlocks(n.message),
              });
            else {
              var r = i.a.clone(e);
              (r.id = this.messageIdx++),
                (r.lines = [
                  {
                    type: e.type,
                    time: s,
                    blocks: this.createTextBlocks(n.message),
                  },
                ]),
                a.a.delete(r, "message"),
                this.addMessage(r);
            }
            return (
              this.scrollToBottom(),
              {
                notify: n.notify,
                messageInfo: this.messages[this.messages.length - 1],
              }
            );
          },
          parseMessage: function (e, t, n) {
            var a = [],
              s = -1,
              r = t.toLowerCase();
            (n = " " + (n || "")),
              i.a.forEach(["http://", "https://"], function (e) {
                for (s = t.indexOf(e); -1 !== s; ) {
                  var n = A.a.firstIndexOf(t, [" ", "\n"], s + e.length) - s;
                  n < 0 && (n = t.length - s);
                  a.push({ idx: s, len: n, type: "link", href: null }),
                    (s = t.indexOf(e, s + 1));
                }
              }),
              (r = t.toLowerCase());
            var o = [];
            i.a.forEach(this.notificationUsers, function (e) {
              var t = e.name.toLowerCase();
              for (s = r.indexOf(t); -1 !== s; )
                -1 === o.indexOf(s) &&
                  (a.push({ idx: s, len: t.length, type: "notification" }),
                  o.push(s)),
                  (s = r.indexOf(t, s + 1));
            });
            var c = [];
            i.a.forEach(l.a.channelsList.orderByGameIdLength, function (e) {
              var t = "#" + e.gameId.toLowerCase();
              for (s = r.indexOf(t); -1 !== s; )
                -1 === c.indexOf(s) &&
                  (a.push({ idx: s, len: t.length, type: "channel" }),
                  c.push(s)),
                  (s = r.indexOf(t, s + 1));
            });
            for (
              var h = {
                  "*": "bold",
                  _: "italic",
                  "~": "strike",
                  "`": "highlight",
                },
                u = [],
                d = [],
                g = [],
                v = 0;
              v < t.length;
              ++v
            ) {
              var f = t[v];
              if (f in h) {
                for (var m = !1, p = 0; p < a.length; ++p) {
                  var C = a[p];
                  if (v > C.idx && v <= C.idx + C.len) {
                    m = !0;
                    break;
                  }
                }
                if (!m)
                  if (0 === u.length)
                    (v !== t.length - 1 && " " === t[v + 1]) ||
                      u.push({ start: v, mark: f });
                  else {
                    var _ = u[u.length - 1];
                    if (f === _.mark)
                      " " !== t[v - 1] && t[v - 1] !== f
                        ? (d.push({
                            start: _.start,
                            end: v - g.length,
                            styles: [h[_.mark]],
                          }),
                          g.push(_.start),
                          g.push(v),
                          u.pop())
                        : (_.idx = v);
                    else {
                      for (var k = !1, y = u.length - 2; y >= 0; --y) {
                        var w = u[y];
                        f === w.mark &&
                          (d.push({
                            start: w.start,
                            end: v - g.length,
                            styles: [h[w.mark]],
                          }),
                          g.push(w.start),
                          g.push(v),
                          u.splice(y),
                          (k = !0));
                      }
                      if (!k) {
                        var b = { start: v, mark: f };
                        u.push(b);
                      }
                    }
                  }
              }
            }
            if (
              (g.sort(function (e, t) {
                return e - t;
              }),
              d.length > 0)
            ) {
              i.a.forEach(g, function (e, t) {
                i.a.forEach(d, function (n) {
                  n.start > e - t
                    ? --n.start
                    : n.start === e
                    ? (n.end -= 2)
                    : n.end >= e - t && --n.end;
                }),
                  i.a.forEach(a, function (n) {
                    n.idx > e - t && --n.idx;
                  });
              }),
                (d = i.a.sortBy(d, [
                  function (e) {
                    return e.start;
                  },
                ]));
              for (var x = 0; ; ) {
                for (var M = d[x], I = 1; I < d.length; ++I) {
                  var U = d[I];
                  if (U.start > M.start && U.end <= M.end) {
                    (M.end = U.start - 1),
                      (U.styles = U.styles.concat(M.styles)),
                      (x = -1);
                    break;
                  }
                }
                if (++x >= d.length) break;
              }
              i.a.forEach(d, function (e) {
                a.push({
                  idx: e.start,
                  len: e.end - e.start + 1,
                  styles: e.styles,
                  type: "markdown",
                });
              });
              var $ = "";
              i.a.forEach(t, function (e, t) {
                -1 === g.indexOf(t) && ($ += e);
              }),
                (t = $);
            }
            a = i.a.sortBy(a, ["idx"]);
            var S = [],
              F = 0,
              N = !1,
              R = this,
              L = ["@" + l.a.localUser.name];
            if (
              (i.a.forEach(a, function (a) {
                a.idx !== F &&
                  S.push({ class: "regular" + n, text: t.substring(F, a.idx) });
                var s = { class: "", text: t.substring(a.idx, a.idx + a.len) };
                switch (("link" === a.type && (s.href = a.href), a.type)) {
                  case "markdown":
                    s.class = a.styles.join(" ");
                    break;
                  case "notification":
                    var i = null;
                    if ("@channel" !== s.text) {
                      var l = s.text.substring(1, s.text.length);
                      i = R.usersByName[l] || null;
                    }
                    (s.class = "user"),
                      (s.author = i),
                      (e.isLocal || -1 !== L.indexOf(s.text)) &&
                        ((s.class = "highlight"), (N = !0));
                    break;
                  default:
                    s.class = a.type;
                }
                (s.class += n), S.push(s), (F = a.idx + a.len);
              }),
              F < t.length)
            ) {
              var T = t.substring(F, t.length);
              S.push({ class: "regular" + n, text: T });
            }
            return { notify: N, message: S };
          },
          scrollToBottom: function () {
            if (this.autoscroll) {
              var e = this;
              i.a.defer(function () {
                (e.ignoreNextScrollEvent = !0),
                  (e.$refs.messagesContainer.scrollTop =
                    e.$refs.messagesContainer.scrollHeight);
              });
            }
          },
          clearChat: function () {
            (this.visibleMessages = []),
              (this.messages = []),
              this.addChannelMotd(this.motd, this.events);
          },
          onScrollLoadMessages: function (e, t) {
            for (
              var n = null, s = this, i = 0;
              i < this.visibleMessages.length;
              ++i
            )
              if (
                A.a.elementIsVisible(
                  this.$refs[this.visibleMessages[i].id][0].$el,
                  this.$refs.chatWrapper
                )
              ) {
                n = this.visibleMessages[i];
                break;
              }
            var l = this.visibleMessages[e].id,
              r = Math.min(l - 1, 50),
              o = Math.min(100 - r, this.messages.length - l);
            this.visibleMessages = this.messages
              .slice(l - r - 1, l - r + r)
              .concat(this.messages.slice(l, l + o));
            var c =
              s.$refs[n.id][0].$el.getBoundingClientRect().top -
              this.$refs.chatWrapper.getBoundingClientRect().top;
            a.a.nextTick(function () {
              s.$refs[n.id][0].$el.scrollIntoView({
                block: "start",
                behaviour: "instant",
              }),
                (s.$refs.messagesContainer.scrollTop -= c),
                t();
            });
          },
          onMessagesContainerScroll: function (e) {
            if (this.ignoreNextScrollEvent) this.ignoreNextScrollEvent = !1;
            else {
              var t = this,
                n = function () {
                  var e =
                    t.$refs.messagesContainer.scrollHeight -
                    (t.$refs.messagesContainer.scrollTop +
                      t.$refs.messagesContainer.clientHeight);
                  t.manageNotificationsHelpersVisibility(),
                    (t.autoscroll = e < 25);
                };
              this.messages.length, this.visibleMessages.length, n();
            }
          },
          processMessage: function () {
            var e = this.inputText.trim(),
              t = this;
            if ("" !== e && 0 === this.matchesList.length)
              if (
                "!" === this.inputText[0] &&
                "[Fightcade Dev]" === this.channel.id
              )
                S.a.sendCommand(
                  this.channel.id,
                  "terminal",
                  e.substring(1, e.length).trim(),
                  function (e) {
                    t.addTerminalMessage(e);
                  }
                );
              else if (
                "!" === this.inputText[0] &&
                "[Fightcade Mod]" === this.channel.id
              )
                S.a.sendCommand(
                  this.channel.id,
                  "moderation",
                  e.substring(1, e.length).trim(),
                  function (e) {
                    t.addTerminalMessage(e);
                  }
                );
              else if (
                "!" === this.inputText[0] &&
                "[Fightcade Evt]" === this.channel.id
              )
                S.a.sendCommand(
                  this.channel.id,
                  "events",
                  e.substring(1, e.length).trim(),
                  function (e) {
                    t.addTerminalMessage(e);
                  }
                );
              else if ("/" === this.inputText[0])
                this.processCommand(e.substring(0, 100));
              else {
                this.autoscroll = !0;
                var n = this.addChatMessage(
                    l.a.localUser,
                    e,
                    { id: this.channel.id, ranked: this.channel.ranked },
                    "sending"
                  ),
                  a = n.messageInfo.lines.length - 1;
                S.a.sendChatMessage(
                  this.channel.id,
                  e.substring(0, 500),
                  function (e) {
                    t.onMessageSent(n.messageInfo.id, a),
                      e &&
                        (n.messageInfo.lines[a].blocks = [
                          {
                            class: "spam",
                            text: "Message not sent. Please stop spamming.",
                          },
                        ]);
                  }
                );
              }
            this.inputText = "";
          },
          processCommand: function (e) {
            var t = e.split(" "),
              n = t[0],
              a = i.a.findIndex(F.a.list, { name: n }),
              s = "";
            if (-1 !== a) {
              var l = t.length > 1 ? t.slice(1) : null;
              s = F.a.list[a].execute(this, l, this.usersByName);
            } else s = n + " not found!";
            s && this.addBotMessage(s);
          },
          onKeyDown: function (e) {
            if (this.matchesList.length > 0) {
              var t = 0;
              switch (e.keyCode) {
                case 9:
                case 13:
                  return (
                    e.stopPropagation(),
                    e.preventDefault(),
                    void this.insertMatch()
                  );
                case 38:
                  return (
                    e.stopPropagation(),
                    e.preventDefault(),
                    (t = this.matchActiveIdx - 1),
                    t < 0 && (t = this.computedmatchesList().length - 1),
                    void this.setActiveMatch(t, !0)
                  );
                case 40:
                  return (
                    e.stopPropagation(),
                    e.preventDefault(),
                    (t = this.matchActiveIdx + 1),
                    t >= this.computedmatchesList().length && (t = 0),
                    void this.setActiveMatch(t, !0)
                  );
              }
            } else 13 === e.keyCode && this.processMessage();
            var n = this;
            i.a.defer(function () {
              n.computeMatches();
            });
          },
          onFocus: function () {
            var e = this;
            i.a.defer(function () {
              e.computeMatches();
            });
          },
          onBlur: function () {
            this.resetMatchesView();
          },
          resetMatchesView: function () {
            i.a.forEach(this.matchesList, function (e) {
              a.a.set(e, "active", !1);
            }),
              (this.matchString = ""),
              (this.matchesList = []),
              (this.matchType = null),
              (this.matchActiveIdx = -1);
          },
          insertMatch: function () {
            var e =
                this.inputText.lastIndexOf(
                  " ",
                  this.$refs.input.selectionStart - 1
                ) + 1,
              t = this.inputText.substring(0, e);
            switch (this.matchType) {
              case "user":
                t += this.matchesList[this.matchActiveIdx].text;
                break;
              case "channel":
                t += "#" + this.matchesList[this.matchActiveIdx].gameId;
                break;
              case "command":
                t += this.matchesList[this.matchActiveIdx].text;
            }
            (t +=
              " " +
              this.inputText.substring(
                this.$refs.input.selectionStart,
                this.inputText.length
              )),
              (this.inputText = t),
              this.resetMatchesView();
            var n = this;
            i.a.delay(function () {
              n.$refs.input.focus();
            }, 0);
          },
          computeMatches: function () {
            var e =
                this.inputText.lastIndexOf(
                  " ",
                  this.$refs.input.selectionStart - 1
                ) + 1,
              t = this.inputText.substring(e, this.$refs.input.selectionStart);
            this.resetMatchesView(),
              t && -1 !== ["@", "#"].indexOf(t[0])
                ? ((this.matchString = t), this.creatematchesList())
                : 0 === this.inputText.indexOf("/") &&
                  ((this.matchString = t), this.creatematchesList());
          },
          rankedChallenge: function (e, t, n, a) {
            this.$emit("ranked-challenge", e, t, n, a);
          },
          cancelChallenge: function (e, t) {
            this.$emit("cancel-challenge", e, t);
          },
          declineChallenge: function (e, t) {
            this.$emit("decline-challenge", e, t);
          },
          acceptChallenge: function (e, t, n) {
            this.$emit("accept-challenge", e, t, n);
          },
          stateChallenge: function (e, t, n, a) {
            this.$emit("state-challenge", e, t, n, a);
          },
          onOuterChallengeNotificationClick: function (e, t) {
            var n = this.channel.outerNotifications[t];
            this.$emit(
              e + "-outer-challenge",
              n.channel.id,
              n.user,
              n.challengeId,
              n.ranked
            ),
              a.a.delete(this.channel.outerNotifications, t);
          },
          onOuterNotificationClick: function (e) {
            var t = this.channel.outerNotifications[e];
            this.$emit(
              "goto-chat-message",
              t.channel.id,
              t.message.id,
              t.message.lineId
            ),
              a.a.delete(this.channel.outerNotifications, e);
          },
          showContextMenu: function (e) {
            this.$emit("show-context-menu", e);
          },
          challengeUser: function (e, t) {
            this.$emit("challenge-user", e, t);
          },
          ignoreUser: function (e, t) {
            this.$emit("ignore-user", e, t);
          },
          gotoChannelByGameId: function (e) {
            this.$emit("goto-channel-by-gameid", e);
          },
          createTextBlocks: function (e) {
            return i.a.isArray(e)
              ? (i.a.forEach(e, function (e) {
                  (e.text = A.a.encodedHTML(e.text)),
                    (e.text = e.text.replace(/(?:\n)/g, "<br>"));
                }),
                e)
              : [
                  {
                    class: "regular",
                    text: A.a.encodedHTML(e).replace(/(?:|\n)/g, "<br>"),
                  },
                ];
          },
          calculateActiveMatch: function (e) {
            var t = e.clientX,
              n = e.clientY;
            if (-1 === this.prevMousePos.x)
              (this.prevMousePos.x = t), (this.prevMousePos.y = n);
            else if (this.prevMousePos.x !== t && this.prevMousePos.y !== n) {
              (this.prevMousePos.x = t), (this.prevMousePos.y = n);
              for (var a = 0; a < this.matchesList.length; ++a) {
                var s = this.$refs["match_" + a][0].getBoundingClientRect();
                if (A.a.pointInBoundingBox(t, n, s)) {
                  this.setActiveMatch(a);
                  break;
                }
              }
            }
          },
          setActiveMatch: function (e, t) {
            if (
              this.matchActiveIdx !== e &&
              (-1 !== this.matchActiveIdx &&
                a.a.set(this.matchesList[this.matchActiveIdx], "active", !1),
              (this.matchActiveIdx = e),
              -1 !== this.matchActiveIdx)
            ) {
              if (t) {
                var n = this.$refs.matchesList.getBoundingClientRect(),
                  s = this.$refs["match_" + e][0].getBoundingClientRect();
                Math.abs(n.top - s.top) > n.height
                  ? this.$refs["match_" + e][0].scrollIntoView(!0)
                  : s.top < n.top
                  ? (this.$refs.matchesList.scrollTop -= s.height)
                  : s.bottom > n.bottom &&
                    (this.$refs.matchesList.scrollTop += s.height);
              }
              a.a.set(this.matchesList[e], "active", !0);
            }
          },
          creatematchesList: function () {
            if (this.matchString) {
              var e = this,
                t = function () {
                  (e.matchesList = i.a.sortBy(e.matchesList, ["text"])),
                    e.matchesList.length > 0 &&
                      ((e.$refs.matchesList.scrollTop = 0),
                      e.setActiveMatch(0));
                },
                n = e.matchString.toLowerCase();
              if ("@" === this.matchString[0])
                (this.matchType = "user"),
                  i.a.forEach(this.notificationUsers, function (t) {
                    0 === t.name.toLowerCase().indexOf(n) &&
                      e.matchesList.push({
                        text: t.name,
                        gravatar: t.gravatar,
                      });
                  }),
                  t();
              else if ("/" === this.matchString[0])
                (this.matchType = "command"),
                  i.a.forEach(F.a.list, function (t) {
                    0 === t.name.indexOf(n) &&
                      e.matchesList.push({
                        text: t.name,
                        description: t.description,
                      });
                  }),
                  t();
              else if ("#" === this.matchString[0]) {
                this.matchType = "channel";
                var a = n.substring(1, n.length);
                i.a.forEach(l.a.channelsList.forNotifications, function (t) {
                  (0 !== a.length && -1 === t.textToCompare.indexOf(a)) ||
                    e.matchesList.push(t);
                }),
                  t();
              }
            }
          },
          avatarSrc: function (e) {
            switch (this.matchType) {
              case "user":
                return "@channel" !== e.text
                  ? A.a.getGravatar(e.gravatar, 24)
                  : "static/ui/logo_icon_light.svg";
              case "channel":
                return (
                  "static/previews/" + e.gameId.replace("fc1_", "") + ".png"
                );
            }
            return null;
          },
          showEmojisView: function () {
            var e = this.$refs.input.getBoundingClientRect();
            this.$emit("show-emojis-view", {
              position: { x: e.right - 16, y: e.top - 2 },
              align: "bottom-right",
            });
          },
          computedmatchesList: function () {
            return this.matchesList.length <= 20
              ? this.matchesList
              : this.matchesList.slice(0, 20);
          },
          discardUnseen: function (e) {
            this.channel[l.a.notificationTypeToVar[e]] = [];
            for (var t = 0; t < this.notificationsHelpers.length; ++t)
              if (this.notificationsHelpers[t].type === e) {
                a.a.delete(this.notificationsHelpers, t);
                break;
              }
          },
          gotoUnseen: function (e) {
            var t = this.channel[l.a.notificationTypeToVar[e]][0];
            this.gotoMessage(t.messageId, t.lineId), this.discardUnseen(e);
          },
          pingSrc: function (e) {
            return l.a.getPingSrc(e);
          },
          pingTitle: function (e) {
            return l.a.getPingTitle(e);
          },
          rankSrc: function (e, t) {
            return "static/ranks/rank" + (e.channelRank[t.id] || 0) + ".png";
          },
          flagSrc: function (e) {
            return "static/flags/" + (e.country.iso_code || "unknown") + ".png";
          },
          getMessageClass: function (e) {
            return e.type + (e.author.dev ? " dev" : "");
          },
          getAcceptButtonLabel: function (e) {
            var t = "Accept";
            return e.ranked > 0 && (t += " FT" + e.ranked), t;
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(3),
        s = n(5),
        i = n(1),
        l = n(6),
        r = n(2),
        o = n.n(r);
      t.default = {
        name: "chat-message",
        props: ["data"],
        data: function () {
          return {
            click: 0,
            reporting: !1,
            reported: !1,
            isSpam: !1,
            linkPreview: { line: -1 },
          };
        },
        methods: {
          getMenuOptions: function (e) {
            if (e.isLocal) return [{ id: "profile", text: "Profile" }];
            var t = -1 !== e.channelsAway.indexOf(this.data.channel.id);
            return [
              { id: "profile", text: "Profile" },
              {
                id: "challenge",
                text: "Challenge",
                disabled: e.away || e.playing || t || e.ignored,
              },
              {
                id: "ignore",
                text: "Ignore",
                active: e.ignored,
                type: "checkbox",
              },
            ];
          },
          showContextMenu: function (e, t) {
            var n = this.getMenuOptions(t),
              a = this.$parent.$el.getBoundingClientRect();
            (this.contextMenuData = {
              user: t,
              position: { x: e.x, y: e.y },
              limitRect: { right: a.right - 30, bottom: a.bottom - 30 },
              callback: this.onContextMenuItemClick,
              items: n,
            }),
              this.$emit("show-context-menu", this.contextMenuData);
          },
          showRankedContextMenu: function (e, t, n) {
            for (var a = [], s = [2, 3, 5, 10, 20], i = 0; i < s.length; i++) {
              var l = s[i];
              a.push({ id: "challengeFT" + l, text: "FT" + l });
            }
            a.push({ id: "challengeUnranked", text: "Unranked" }),
              (this.contextMenuData = {
                user: e,
                position: t,
                limitRect: n,
                callback: this.onContextMenuItemClick,
                items: a,
              }),
              this.$emit("show-context-menu", this.contextMenuData);
          },
          challengeUser: function (e, t) {
            this.$emit("challenge-user", e, t);
          },
          viewProfile: function (e) {
            var t = "http://www.fightcade.com/id/" + encodeURIComponent(e.name);
            window.open(t, "_blank");
          },
          onContextMenuItemClick: function (e) {
            switch (e) {
              case "challenge":
                if (
                  this.data.channel.ranked &&
                  i.a.localUser.settings.ranked &&
                  this.contextMenuData.user.settings.ranked
                ) {
                  var t = this;
                  a.a.nextTick(function () {
                    t.showRankedContextMenu(
                      t.contextMenuData.user,
                      t.contextMenuData.position,
                      t.contextMenuData.limitRect
                    );
                  });
                } else this.challengeUser(this.contextMenuData.user);
                break;
              case "challengeUnranked":
                this.challengeUser(this.contextMenuData.user, 0);
                break;
              case "challengeFT2":
                this.challengeUser(this.contextMenuData.user, 2);
                break;
              case "challengeFT3":
                this.challengeUser(this.contextMenuData.user, 3);
                break;
              case "challengeFT5":
                this.challengeUser(this.contextMenuData.user, 5);
                break;
              case "challengeFT10":
                this.challengeUser(this.contextMenuData.user, 10);
                break;
              case "challengeFT20":
                this.challengeUser(this.contextMenuData.user, 20);
                break;
              case "profile":
                this.viewProfile(this.contextMenuData.user);
                break;
              case "spectate":
                this.spectateMatch(this.contextMenuData.user);
                break;
              case "goto_playing_channel":
                this.$emit(
                  "goto-channel-by-gameid",
                  this.contextMenuData.user.playing.gameId
                );
                break;
              case "ignore":
                this.$emit(
                  "ignore-user",
                  this.contextMenuData.user.id,
                  !this.contextMenuData.user.ignored
                );
                break;
              case "sharelobby":
                this.shareLobby(this.contextMenuData.user);
            }
          },
          onReport: function () {
            this.reporting = !0;
          },
          onConfirmReport: function () {
            var e = "";
            o.a.forEach(this.data.lines, function (t) {
              (e += "`"),
                o.a.forEach(t.blocks, function (t) {
                  e += t.text;
                }),
                (e += "`\n");
            });
            var t = this;
            l.a.sendReport(
              {
                username: this.data.author.name,
                channelname: this.data.channel.id,
                text: e,
              },
              function (e, n) {
                (t.isSpam = n), (t.reporting = !1), (t.reported = !0);
              }
            );
          },
          canReport: function () {
            return (
              !this.reporting &&
              !this.reported &&
              i.a.localUser.id !== this.data.author.name &&
              i.a.localUser.settings.report > 0
            );
          },
          canConfirmReport: function () {
            return this.reporting && i.a.localUser.id !== this.data.author.name;
          },
          userRole: function (e) {
            return e.dev
              ? "author dev"
              : e.patreon
              ? "author patreon"
              : "author";
          },
          onLineBlockClick: function (e, t, n) {
            if (-1 !== e.class.indexOf("link"))
              window.open(e.href || e.text, "_blank");
            else if (-1 !== e.class.indexOf("channel")) {
              var a = e.text.substring(1, e.text.length);
              this.canJoinChannel(a) && this.$emit("goto-channel-by-gameid", a);
            } else {
              this.$refs["block_" + t + "_" + n];
            }
          },
          onSent: function (e) {
            o.a.forEach(this.data.lines[e].blocks, function (e) {
              -1 !== e.class.indexOf("sending") &&
                (e.class = e.class.replace("sending", ""));
            });
          },
          timeInfo: function (e) {
            return s.a.formatTime(e);
          },
          isVisible: function (e, t) {
            return s.a.elementIsVisible(this.$refs["line_" + t][0], e);
          },
          scrollTo: function (e) {
            this.$refs["line_" + e][0].scrollIntoView(!0);
          },
          canJoinChannel: function (e) {
            return (
              -1 !== i.a.localUser.channels.indexOf(i.a.channelByGameId[e]) ||
              !i.a.localUser.maxNumChannelsReached
            );
          },
          blockTitle: function (e) {
            if (
              -1 !== e.class.indexOf("channel") &&
              !this.canJoinChannel(e.text.substring(1, e.text.length))
            ) {
              var t = i.a.localUser.role,
                n =
                  "You can't join this channel since you reached the maximum amount of concurrent channels.";
              return (
                t < 20 && (n += " Raise this limit by becoming a patron."),
                t >= 20 &&
                  t < 50 &&
                  (n += " Raise this limit by joining a higher Patreon tier."),
                n
              );
            }
            return null;
          },
          blockClass: function (e) {
            var t = e.class;
            return (
              -1 === e.class.indexOf("channel") ||
                this.canJoinChannel(e.text.substring(1, e.text.length)) ||
                (t += " disabled"),
              t
            );
          },
        },
        computed: {
          avatarSrc: function () {
            return s.a.getGravatar(this.data.author.gravatar, 40);
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = {
          name: "endgame-message",
          props: ["data"],
          computed: {
            isRanked: function () {
              return this.data.endgame.ranked > 0;
            },
            showElo: function () {
              return (
                this.data.endgame.finalElo > 0 &&
                this.data.endgame.initialElo > 0
              );
            },
            player1Name: function () {
              return 0 === this.data.endgame.playerId
                ? this.data.endgame.name
                : this.data.endgame.opponent.name;
            },
            player2Name: function () {
              return 1 === this.data.endgame.playerId
                ? this.data.endgame.name
                : this.data.endgame.opponent.name;
            },
            isRagequit: function () {
              return (
                this.data.endgame.ranked > this.data.endgame.scores[0] &&
                this.data.endgame.ranked > this.data.endgame.scores[1]
              );
            },
            outcomeMsg: function () {
              return this.data.endgame.finalElo === this.data.endgame.initialElo
                ? null
                : this.data.endgame.finalElo > this.data.endgame.initialElo
                ? "won"
                : "lost";
            },
          },
        });
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(5);
      t.default = {
        name: "channel-message",
        props: ["data"],
        methods: {
          timeInfo: function (e) {
            return a.a.formatTime(e);
          },
          onLineBlockClick: function (e) {
            -1 !== e.class.indexOf("link") &&
              window.open(e.href || e.text, "_blank");
          },
          eventThumbnail: function (e) {
            var t = "/static/previews/" + e.gameid.replace("fc1_", "") + ".png";
            return e.image || t;
          },
          eventInfo: function (e) {
            return e.name;
          },
          eventDate: function (e) {
            return new Date(e.date).toLocaleString() + " - " + e.region;
          },
          infoButtonClicked: function (e) {
            window.open(e.link, "_blank");
          },
          infoButtonTitle: function (e) {
            return e.link;
          },
          streamButtonIsAvailable: function (e) {
            return void 0 !== e.stream;
          },
          streamButtonClicked: function (e) {
            window.open(e.stream, "_blank");
          },
          streamButtonTitle: function (e) {
            return e.stream;
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = { name: "raw-message", props: ["data"] });
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = {
          name: "request-challenge-message",
          props: ["data"],
          methods: {
            cancelChallenge: function () {
              this.$emit(
                "cancel-challenge",
                this.data.opponent,
                this.data.challengeId
              );
            },
            onChallengeChangesState: function (e) {
              (this.data.state = e),
                this.$emit(
                  "state-challenge",
                  this.data.opponent,
                  this.data.challengeId,
                  this.data.ranked,
                  this.data.state
                );
            },
          },
          computed: {
            message: function () {
              switch (this.data.state) {
                case "active":
                  return this.data.ranked
                    ? "You have challenged " +
                        this.data.opponent.name +
                        " to a FT" +
                        this.data.ranked
                    : "You have challenged " + this.data.opponent.name;
                case "cancelled":
                  return (
                    "Challenge to " + this.data.opponent.name + " cancelled"
                  );
                case "accepted":
                  return this.data.opponent.name + " accepts the challenge";
                case "declined":
                  return this.data.opponent.name + " rejects the challenge";
              }
              return "";
            },
          },
        });
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = {
          name: "request-ranked-challenge-message",
          props: ["data"],
          methods: {
            cancelChallenge: function () {
              this.$emit(
                "cancel-challenge",
                this.data.opponent,
                this.data.challengeId
              );
            },
            challenge: function (e) {
              (this.data.state = "waiting"), (this.data.ranked = e);
              var t = this;
              this.$emit(
                "ranked-challenge",
                this.data.opponent,
                this.data.challengeId,
                this.data.ranked,
                function () {
                  t.onChallengeChangesState("active");
                }
              );
            },
            onChallengeChangesState: function (e) {
              (this.data.state = e),
                this.$emit(
                  "state-challenge",
                  this.data.opponent,
                  this.data.challengeId,
                  this.data.ranked,
                  this.data.state
                );
            },
          },
          computed: {
            message: function () {
              switch (this.data.state) {
                case "challenging":
                case "waiting":
                  return "Challenge " + this.data.opponent.name;
                case "active":
                  return "You have challenged " + this.data.opponent.name;
                case "cancelled":
                  return (
                    "Challenge to " + this.data.opponent.name + " cancelled"
                  );
                case "accepted":
                  return this.data.opponent.name + " accepts the challenge";
                case "declined":
                  return this.data.opponent.name + " rejects the challenge";
              }
              return "";
            },
          },
        });
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = { name: "terminal-message", props: ["data"] });
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = {
          name: "context-menu",
          props: ["data"],
          computed: {
            itemType: function () {
              if ("challenge" !== this.data.id) return "contextMenuItem";
            },
            itemClass: function () {
              return {
                disabled: this.data.disabled,
                warning: this.data.warning,
                "button-generic": "challenge" === this.data.id,
              };
            },
            ignoreToggle: function () {
              return "ignoreToggle_" + this.channel.gameid;
            },
          },
          methods: {
            click: function (e) {
              ("checkbox" === this.data.type && "checkbox" !== e.target.type) ||
                this.data.disabled ||
                this.$emit(
                  "click",
                  this.data.id,
                  "checkbox" !== this.data.type
                );
            },
          },
        });
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(202),
        s = n.n(a),
        i = n(3);
      t.default = {
        name: "context-menu",
        props: ["data"],
        data: function () {
          return { menuPos: {} };
        },
        components: { Item: s.a },
        computed: {
          menuStyle: function () {
            return { top: this.menuPos.y + "px", left: this.menuPos.x + "px" };
          },
        },
        methods: {
          close: function () {
            this.$emit("close");
          },
          show: function (e, t) {
            if (t) {
              var n = this.$refs.menu.clientWidth,
                a = this.$refs.menu.clientHeight;
              t.right && e.x + n > t.right && (e.x -= n),
                t.bottom && e.y + a > t.bottom && (e.y -= a);
            }
            (e.x -= 10),
              (e.y += 8),
              i.a.set(this.menuPos, "x", e.x),
              i.a.set(this.menuPos, "y", e.y);
          },
          onItemClick: function (e, t) {
            this.data.callback(e), t && this.close();
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(57),
        s = n(3),
        i = n(2),
        l = n.n(i),
        r = n(22),
        o = n(5);
      t.default = {
        name: "login",
        components: { gRecaptcha: a.a },
        data: function () {
          return {
            working: !1,
            oldVersion: !1,
            username: "",
            email: "",
            password: "",
            activeViewIsSignIn: !0,
            showAccountCreatedMessage: !1,
            errorMessages: {
              username: null,
              email: null,
              password: null,
              beta: null,
            },
          };
        },
        methods: {
          validateInput: function (e, t, n) {
            return (
              e &&
                ((this.errorMessages.email = null),
                this.email
                  ? o.a.validateEmail(this.email) ||
                    (this.errorMessages.email =
                      "(The e-mail format is invalid)")
                  : (this.errorMessages.email = "(This field is required)")),
              t &&
                ((this.errorMessages.password = null),
                this.password ||
                  (this.errorMessages.password = "(This field is required)"),
                this.password.length > 100 &&
                  (this.errorMessages.password =
                    "(Password must not exceed 100 characters)")),
              n &&
                ((this.errorMessages.username = null),
                this.username ||
                  (this.errorMessages.username = "(This field is required)"),
                this.username.length > 20 &&
                  (this.errorMessages.username =
                    "(Username must not exceed 20 characters)"),
                this.username.length < 3 &&
                  (this.errorMessages.username =
                    "(Username must be longer than 3 characters)")),
              !(
                (e && this.errorMessages.email) ||
                (t && this.errorMessages.password) ||
                (n && this.errorMessages.username)
              )
            );
          },
          doWork: function (e) {
            if (this.oldVersion)
              return void window.location.assign("https://www.fightcade.com");
            if (!this.working)
              if (this.validateInput(!this.signIn(), !0, !0)) {
                if (((this.working = !0), this.signIn()))
                  this.$emit("connect", this.username, this.password);
                else if (e) {
                  var t = this;
                  r.a.createUser(
                    this.email,
                    this.username,
                    this.password,
                    e,
                    function (e) {
                      (t.working = !1),
                        "error" === e.result
                          ? t.manageErrors(e.error, e)
                          : t.accountCreatedSuccess();
                    }
                  );
                }
              } else
                this.errorMessages.email
                  ? this.$refs.email.focus()
                  : this.errorMessages.username
                  ? this.$refs.username.focus()
                  : this.$refs.password.focus();
          },
          connectAs: function (e) {
            this.$emit("connect", e, "");
          },
          onConnectError: function (e, t) {
            (this.working = !1), this.manageErrors(e, t);
          },
          formTitle: function () {
            return this.signIn() ? "Log in" : "Create an account";
          },
          changeWorkActionText: function () {
            return this.signIn() ? "New user?" : "Already have an account?";
          },
          changeWorkActionLink: function () {
            return this.signIn() ? "Create an account" : "Log in";
          },
          workAction: function () {
            return this.oldVersion
              ? "Download"
              : this.signIn()
              ? "Connect"
              : "Register";
          },
          changeWorkActionLinkClicked: function () {
            if (!this.working) {
              (this.activeViewIsSignIn = !this.activeViewIsSignIn),
                (this.password = ""),
                (this.username = ""),
                (this.email = ""),
                (this.errorMessages = {
                  username: null,
                  email: null,
                  password: null,
                });
              var e = this;
              s.a.nextTick(function () {
                e.$refs.username.focus();
              });
            }
          },
          signIn: function () {
            return this.activeViewIsSignIn;
          },
          toDuration: function (e) {
            var t = Math.floor(e % 24),
              n = Math.floor(e / 24);
            return n > 0
              ? n + " days and " + t + " hours"
              : t > 1
              ? t + " hours"
              : 1 === t
              ? " 1 hour"
              : " < 1 hour";
          },
          manageErrors: function (e, t) {
            var n = t.reason ? " (" + t.reason + ")" : "";
            switch (e) {
              case "wrong-password":
                (this.errorMessages.password = "Wrong password."),
                  this.$refs.password.focus();
                break;
              case "too-many-failed-login":
                (this.errorMessages.password =
                  "Too many failed login attempts. Please reset your password or you will be temporarily locked out."),
                  this.$refs.password.focus();
                break;
              case "login-locked":
                this.errorMessages.generic =
                  "Too many failed login attempts. Login temporarily locked out. Please try again later.";
                break;
              case "password-length-invalid":
                (this.errorMessages.password =
                  "Invalid password length. Password must be at least 8 characters long."),
                  this.$refs.password.focus();
                break;
              case "user-already-exists":
                (this.errorMessages.username =
                  "This username already exists. Please choose a different account name."),
                  this.$refs.username.focus();
                break;
              case "recaptcha-error":
                (this.errorMessages.username =
                  "Recaptcha error! Please reload the application."),
                  this.$refs.username.focus();
                break;
              case "user-name-invalid":
                (this.errorMessages.username =
                  "This username can't be registered. Please choose a different account name."),
                  this.$refs.username.focus();
                break;
              case "user-name-too-long":
                (this.errorMessages.username =
                  "Username too long. Maximum user length is 20 characters."),
                  this.$refs.username.focus();
                break;
              case "user-name-too-short":
                (this.errorMessages.username =
                  "Username too short. Minimum user length is 3 characters."),
                  this.$refs.username.focus();
                break;
              case "user-wrong-email":
                (this.errorMessages.username = "Invalid email address."),
                  this.$refs.email.focus();
                break;
              case "user-not-found":
                (this.errorMessages.username = "This username doesn't exist."),
                  this.$refs.username.focus();
                break;
              case "user-newaccount-muted":
                (this.errorMessages.username =
                  "You have been muted for inappropriate behavior" +
                  n +
                  ". Muted users are not allowed to use new accounts, please log-in using your old account. Attempts to circumvent moderation rulings may result in more severe penalties."),
                  this.$refs.username.focus();
                break;
              case "user-locked":
                (this.errorMessages.username =
                  "This account has been banned for inappropriate behavior" +
                  n +
                  ". It will be restored in " +
                  this.toDuration(t.expiry) +
                  ". Attempts to circumvent moderation rulings may result in more severe penalties."),
                  this.$refs.username.focus();
                break;
              case "user-banned":
                (this.errorMessages.username =
                  "This account has been banned for continued inappropriate behavior" +
                  n +
                  ". Attempts to circumvent moderation rulings may result in more severe penalties."),
                  this.$refs.username.focus();
                break;
              case "server-locked":
                (this.errorMessages.username =
                  "You are not allowed to log in at this moment. Server might be under maintenance."),
                  this.$refs.username.focus();
                break;
              case "old-version":
                (this.errorMessages.generic =
                  "You're using an outdated version of Fightcade. If Fightcade doesn't auto-update please download it from fightcade.com and reinstall."),
                  (this.oldVersion = !0);
            }
          },
          accountCreatedSuccess: function () {
            var e = this,
              t = this.username;
            (this.showAccountCreatedMessage = !0),
              this.changeWorkActionLinkClicked(),
              l.a.delay(function () {
                e.showAccountCreatedMessage = !1;
              }, 3e3),
              s.a.nextTick(function () {
                (e.username = t), e.$refs.password.focus();
              });
          },
          gRecaptchaValidate: function () {
            return (
              !this.working &&
              (!!this.validateInput(!this.signIn(), !0, !0) ||
                (this.errorMessages.email
                  ? this.$refs.email.focus()
                  : this.errorMessages.username
                  ? this.$refs.username.focus()
                  : this.$refs.password.focus(),
                !1))
            );
          },
          gRecaptchaCallback: function (e) {
            this.doWork(e);
          },
          onFormKeyDown: function (e) {
            13 === e.keyCode && this.signIn() && this.doWork();
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(3),
        s = n(2),
        i = n.n(s),
        l = n(1),
        r = n(5),
        o = n(6),
        c = n(183),
        h = n.n(c),
        u = n(180),
        d = n.n(u),
        g = n(207),
        v = n.n(g),
        f = n(206),
        m = n.n(f);
      t.default = {
        name: "main-toolbar",
        data: function () {
          return {
            channels: [],
            localUser: l.a.localUser,
            showSettings: !1,
            showNotifications: !1,
            showGlobalStateMenu: !1,
            showNotificationsIndicator: !1,
            global: l.a,
          };
        },
        components: {
          ChannelItem: h.a,
          ButtonItem: d.a,
          Settings: v.a,
          Notifications: m.a,
        },
        computed: {
          avatarSrc: function () {
            return r.a.getGravatar(l.a.localUser.gravatar, 100);
          },
        },
        methods: {
          selectChannel: function (e) {
            (this.showNotifications = !1),
              (this.showSettings = !1),
              this.$emit("select-channel", e);
          },
          onNewNotification: function (e, t) {
            this.$refs.notifications.onNewNotification(e),
              "message" !== e.type &&
                (this.showNotificationsIndicator =
                  t && !this.showNotifications);
          },
          setChannels: function (e) {
            this.channels = e;
          },
          setActiveChannel: function (e) {
            var t = i.a.findIndex(this.channels, { active: !0 });
            -1 !== t && a.a.set(this.channels[t], "active", !1);
            var n = i.a.findIndex(this.channels, { id: e });
            -1 !== e && a.a.set(this.channels[n], "active", !0);
          },
          showChannelContextMenu: function (e, t) {
            var n = -1 !== l.a.localUser.channelsAway.indexOf(e.id);
            (this.contextMenuData = {
              channel: e,
              position: t,
              callback: this.onContextMenuItemClick,
              items: [
                {
                  id: "toggle_channel_away",
                  text: "Not available",
                  type: "checkbox",
                  active: n,
                },
                { id: "leave_channel", text: "Leave channel", warning: !0 },
              ],
            }),
              this.$emit("show-context-menu", this.contextMenuData);
          },
          onContextMenuItemClick: function (e) {
            switch (e) {
              case "toggle_channel_away":
                var t =
                  -1 !==
                  l.a.localUser.channelsAway.indexOf(
                    this.contextMenuData.channel.id
                  );
                o.a.setAway(!t, this.contextMenuData.channel.id);
                break;
              case "leave_channel":
                this.$emit("leave-channel", this.contextMenuData.channel.id);
            }
          },
          acceptChallenge: function (e, t, n, a) {
            this.$emit("accept-challenge", e, t, n, a);
          },
          declineChallenge: function (e, t, n) {
            this.$emit("decline-challenge", e, t, n);
          },
          updateChallengeNotification: function (e, t, n, a) {
            this.$refs.notifications.updateChallengeNotification(e, t, n, a);
          },
          removeChallengeNotifications: function () {
            this.$refs.notifications.removeChallengeNotifications();
          },
          gotoChatMessage: function (e, t, n) {
            this.$emit("goto-chat-message", e, t, n);
          },
          setAwayState: function (e) {
            (this.localUser.away = e),
              o.a.setAway(e),
              (this.showGlobalStateMenu = !1);
          },
          logOut: function () {
            o.a.logout();
          },
          leaveChannel: function (e) {
            this.$emit("leave-channel", e);
          },
          channelItemInitialized: function () {
            this.$emit("channel-item-initialized");
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(3),
        s = n(2),
        i = n.n(s),
        l = n(1);
      t.default = {
        name: "notifications",
        data: function () {
          return { notifications: [], notificationIdx: 0 };
        },
        methods: {
          closeNotifications: function () {
            this.$emit("close");
          },
          onNewNotification: function (e) {
            if ("message" !== e.type) {
              var t = "Accept";
              e.ranked > 0 && (t += " FT" + e.ranked);
              var n = {
                  type: e.type,
                  channel: e.channel,
                  message: e.message,
                  user: e.user,
                  challengeId: e.challengeId,
                  ranked: e.ranked,
                  acceptButtonLabel: t,
                  title:
                    "New " +
                    ("mention" === e.type ? "Mention" : "Challenge") +
                    " on #" +
                    e.channel.name,
                },
                s = this;
              "challenge" === n.type && (n.challengeType = "requested"),
                this.notifications.unshift(n),
                a.a.nextTick(function () {
                  i.a.forEach(s.$refs.notification_title, function (e) {
                    e.title = n.title;
                  });
                });
            }
          },
          pingSrc: function (e) {
            return l.a.getPingSrc(e);
          },
          pingTitle: function (e) {
            return l.a.getPingTitle(e);
          },
          rankSrc: function (e, t) {
            return "static/ranks/rank" + (t.channelRank[e.id] || 0) + ".png";
          },
          flagSrc: function (e) {
            return "static/flags/" + (e.country.iso_code || "unknown") + ".png";
          },
          onChallengeNotificationClick: function (e, t) {
            var n = this.notifications[t];
            this.$emit(
              e + "-challenge",
              n.channel.id,
              n.user,
              n.challengeId,
              n.ranked
            ),
              "accept" === e && this.closeNotifications();
          },
          onNotificationClick: function (e) {
            var t = this.notifications[e];
            this.$emit(
              "goto-chat-message",
              t.channel.id,
              t.message.id,
              t.message.lineId
            ),
              this.closeNotifications();
          },
          updateChallengeNotification: function (e, t, n, a) {
            for (var s = 0; s < this.notifications.length; ++s) {
              var i = this.notifications[s];
              if (
                "challenge" === i.type &&
                i.user.id === e.id &&
                i.channel.id === t &&
                i.message.challengeId === n
              ) {
                this.notifications[s].challengeType = a;
                break;
              }
            }
          },
          removeChallengeNotifications: function () {
            for (var e = 0; e < this.notifications.length; ++e) {
              "challenge" === this.notifications[e].type &&
                (this.notifications[e].challengeType = "declined");
            }
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(2),
        s = n.n(a),
        i = n(1),
        l = n(5),
        r = n(6);
      t.default = {
        name: "settings",
        data: function () {
          return {
            localUser: i.a.localUser,
            delayValues: [
              "Automatic",
              "0 (more jerky)",
              1,
              2,
              3,
              4,
              5,
              6,
              "7 (laggy)",
            ],
            themesValues: [],
            editingEmail: !1,
            savingEmail: !1,
            editingEmailMessage: null,
            editingEmailMessageClass: "",
            editingPassword: !1,
            savingPassword: !1,
            editingPasswordMessage: null,
            editingPasswordMessageClass: "",
            password: "",
            email: "",
          };
        },
        computed: {
          avatarSrc: function () {
            return l.a.getGravatar(i.a.localUser.gravatar, 100);
          },
        },
        mounted: function () {
          var e = this;
          s.a.forEach(i.a.themes, function (t) {
            e.themesValues.push(t);
          });
        },
        methods: {
          closeSettings: function () {
            this.$emit("close");
          },
          saveSetting: function (e) {
            var t = {},
              n = {
                desktopNotifications: "desktop_notifications",
                soundNotifications: "sound_notifications",
                userEventsNotifications: "user_events_notifications",
                chatMuted: "chat_muted",
                autoAfk: "auto_afk",
                disableSpectators: "disable_spectators",
                preventBadChallenges: "prevent_bad_challenges",
                preventWifiChallenges: "prevent_wifi_challenges",
              },
              a = e;
            e in n && (a = n[e]),
              (t[a] = i.a.localUser.settings[e]),
              r.a.updateUser(t),
              "theme" === e && i.a.setTheme(this.localUser.settings.theme);
          },
          startEditingValue: function (e) {
            var t = "editing" + e;
            this[t] ||
              ((this[t] = !0),
              "Email" === e &&
                (this.email = this.localUser.email.substring(
                  0,
                  this.localUser.email.length - 1
                )));
          },
          saveValue: function (e) {
            var t = "editing" + e,
              n = t + "Message",
              a = n + "Class",
              i = "saving" + e,
              o = "",
              c = "";
            if (
              ((this[t] = !1),
              "Email" === e
                ? ((o = "email"), (c = this.localUser.email))
                : ((o = "pwd"), (c = this.password)),
              "" === c)
            )
              return (
                (this[a] = "error"),
                (this[n] = "This field can't be empty."),
                void ("Email" === e
                  ? (this.localUser.email = this.email)
                  : (this.password = ""))
              );
            if ("Email" === e && !l.a.validateEmail(this.localUser.email))
              return (
                (this[a] = "error"),
                (this[n] = "Invalid e-mail format."),
                void (this.localUser.email = this.email)
              );
            if ("Password" === e && !l.a.validatePassword(this.password))
              return (
                (this[a] = "error"),
                void (this[n] = "Password lenght must be between 8 and 100.")
              );
            this[i] = !0;
            var h = this,
              u = {};
            (u[o] = c),
              r.a.updateUser(u, function (t, l) {
                (h[i] = !1),
                  (h[a] = t ? "success" : "error"),
                  t
                    ? ((h[n] = "Your " + e + " has been updated succesfully."),
                      s.a.delay(function () {
                        h[n] = null;
                      }, 3e3))
                    : ((h[n] =
                        "Error updating " + e + ". Please try again later."),
                      "Email" === e
                        ? (h.localUser.email = h.email)
                        : (h.password = ""));
              });
          },
          openPatreonChannel: function () {
            this.$emit("select-channel", "patreon-channel");
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(5);
      t.default = {
        name: "match-item",
        props: ["channel", "data"],
        data: function () {
          return { click: 0 };
        },
        methods: {
          showContextMenu: function (e) {
            var t = this.$parent.$el.getBoundingClientRect();
            this.$emit(
              "show-context-menu-match",
              this.data,
              { x: e.clientX, y: e.clientY },
              { right: t.right - 30, bottom: t.bottom - 30 }
            );
          },
          onClick: function (e) {
            2 === ++this.click &&
              this.channel.spectators &&
              (this.$emit("spectate-match", this.data.player1),
              (this.click = 0));
          },
          userRole: function (e) {
            return e.dev
              ? "playerName dev"
              : e.patreon
              ? "playerName patreon"
              : "playerName";
          },
          avatarSrc: function (e) {
            return a.a.getGravatar(e.gravatar, 34);
          },
          rankSrc: function (e) {
            return (
              "static/ranks/rank" +
              (e.channelRank[this.channel.id] || 0) +
              ".png"
            );
          },
          flagSrc: function (e) {
            return "static/flags/" + (e.country.iso_code || "unknown") + ".png";
          },
          isRanked: function (e) {
            return e.settings.ranked && this.channel.ranked;
          },
          getRankTitle: function (e) {
            var t = e.channelRank[this.channel.id] || 0,
              n = ["E", "D", "C", "B", "A", "S"];
            return t > 0 && t <= n.length ? "Rank " + n[t - 1] : "Unknown rank";
          },
          vsText: function () {
            return this.data.ranked ? "FT" + this.data.ranked : "VS ";
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(3),
        s = n(5);
      t.default = {
        name: "user-info",
        data: function () {
          return { position: {}, user: {} };
        },
        computed: {
          infoStyle: function () {
            return {
              top: this.position.y + "px",
              left: this.position.x + "px",
            };
          },
          stateClass: function () {
            var e = ["state"];
            return (
              this.user.away
                ? e.push("away")
                : this.user.playing && e.push("playing"),
              e
            );
          },
          avatarSrc: function () {
            return s.a.getGravatar(this.user.gravatar, 100);
          },
          flagSrc: function () {
            return (
              "static/flags/" +
              (this.user.country.iso_code || "unknown") +
              ".png"
            );
          },
        },
        methods: {
          close: function () {
            this.$emit("close"), (this.user = null);
          },
          show: function (e, t, n, s) {
            if (((this.user = e), n)) {
              var i = this.$refs.content.clientWidth,
                l = this.$refs.content.clientHeight;
              ("right" === s || (n.right && t.x + i > n.right)) && (t.x -= i),
                n.bottom && t.y + l > n.bottom && (t.y -= t.y + l - n.bottom);
            }
            a.a.set(this.position, "x", t.x), a.a.set(this.position, "y", t.y);
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(2),
        s = n.n(a),
        i = n(5),
        l = n(1);
      t.default = {
        name: "user-item",
        props: ["user", "channel"],
        data: function () {
          return { click: 0 };
        },
        computed: {
          userRole: function () {
            return this.user.dev
              ? "playerName dev"
              : this.user.patreon
              ? "playerName patreon"
              : "playerName";
          },
          avatarSrc: function () {
            return i.a.getGravatar(this.user.gravatar, 40);
          },
          flagSrc: function () {
            return (
              "static/flags/" +
              (this.user.country.iso_code || "unknown") +
              ".png"
            );
          },
          isRanked: function () {
            return (
              this.user.settings.ranked &&
              this.channel.ranked &&
              l.a.localUser.settings.ranked
            );
          },
          rankSrc: function () {
            return (
              "static/ranks/rank" +
              (this.user.channelRank[this.channel.id] || 0) +
              ".png"
            );
          },
          rankTitle: function () {
            var e = this.user.channelRank[this.channel.id] || 0,
              t = ["E", "D", "C", "B", "A", "S"];
            return e > 0 && e <= t.length ? "Rank " + t[e - 1] : "Unknown rank";
          },
          pingSrc: function () {
            return l.a.getPingSrc(this.user);
          },
          pingTitle: function () {
            return l.a.getPingTitle(this.user);
          },
        },
        methods: {
          showContextMenu: function (e) {
            var t = this.$parent.$el.getBoundingClientRect();
            this.$emit(
              "show-context-menu",
              this.user,
              { x: e.clientX, y: e.clientY },
              { right: t.right - 30, bottom: t.bottom - 30 }
            );
          },
          onClick: function () {
            if (1 === ++this.click) {
              var e = this;
              s.a.delay(function () {
                if (1 === e.click) {
                  var t = e.$parent.$el.getBoundingClientRect(),
                    n = e.$el.getBoundingClientRect(),
                    a = { x: n.left + 20, y: n.top };
                  e.$emit("show-user-info", e.user, a, {
                    bottom: t.bottom - 30,
                  }),
                    (e.click = 0);
                }
              }, l.a.doubleClickTime);
            } else this.$emit("challenge-user", this.user), (this.click = 0);
          },
        },
      };
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = n(3),
        s = n(2),
        i = n.n(s),
        l = n(1),
        r = n(210),
        o = n.n(r),
        c = n(208),
        h = n.n(c),
        u = n(6),
        d = ["name", "ping", "rank"];
      t.default = {
        name: "users-list",
        props: ["channel"],
        data: function () {
          return {
            users: [],
            matches: [],
            usersOnline: [],
            usersAway: [],
            usersIgnored: [],
            channelAway: !1,
          };
        },
        components: { UserItem: o.a, MatchItem: h.a },
        computed: {
          matchesNumber: function () {
            return 2 * this.matches.length;
          },
          channelAwayToggle: function () {
            return "channelAwayToggle_" + this.channel.gameid;
          },
          sortingByMessage: function () {
            return "Players sorted by " + l.a.localUser.settings.usersSortBy;
          },
        },
        methods: {
          setUsers: function (e) {
            (this.users = e), this.rebuildUsersLists();
          },
          addUser: function (e) {
            this.users.push(e), this.rebuildUsersLists();
          },
          removeUser: function (e) {
            var t = i.a.findIndex(this.users, { id: e.id });
            -1 !== t && (a.a.delete(this.users, t), this.rebuildUsersLists());
          },
          addMatch: function (e) {
            -1 === i.a.findIndex(this.matches, { quarkId: e.quarkId }) &&
              this.matches.push(e);
          },
          removeMatch: function (e) {
            var t = i.a.findIndex(this.matches, { quarkId: e.quarkId });
            -1 !== t && a.a.delete(this.matches, t);
          },
          showUserContextMenu: function (e, t, n) {
            var a = this.getMenuOptions(e);
            a &&
              ((this.contextMenuData = {
                user: e,
                position: t,
                limitRect: n,
                callback: this.onContextMenuItemClick,
                items: a,
              }),
              this.$emit("show-context-menu", this.contextMenuData));
          },
          showMatchContextMenu: function (e, t, n) {
            this.channel.spectators &&
              ((this.contextMenuData = {
                user: e.player1,
                position: t,
                limitRect: n,
                callback: this.onContextMenuItemClick,
                items: [{ id: "spectate", text: "Spectate" }],
              }),
              this.$emit("show-context-menu", this.contextMenuData));
          },
          showRankedContextMenu: function (e, t, n) {
            for (var a = [], s = [2, 3, 5, 10, 20], i = 0; i < s.length; i++) {
              var l = s[i];
              a.push({ id: "challengeFT" + l, text: "FT" + l });
            }
            a.push({ id: "challengeUnranked", text: "Unranked" }),
              (this.contextMenuData = {
                user: e,
                position: t,
                limitRect: n,
                callback: this.onContextMenuItemClick,
                items: a,
              }),
              this.$emit("show-context-menu", this.contextMenuData);
          },
          viewProfile: function (e) {
            var t = "http://www.fightcade.com/id/" + encodeURIComponent(e.name);
            window.open(t, "_blank");
          },
          reportProfile: function (e) {
            u.a.sendReport(
              { username: e.name, channelname: this.channel.id, text: "" },
              function (e) {}
            );
          },
          spectateMatch: function (e) {
            if (this.channel.spectators) {
              var t = u.a.getSpectateUri(
                this.channel.emulator,
                e.playing.gameId,
                e.playing.quarkId,
                e.playing.port
              );
              window.location.assign(t);
            }
          },
          challengeUser: function (e, t) {
            this.$emit("challenge-user", e, t);
          },
          shareLobby: function (e) {
            u.a.sendMsgMessage(
              this.channel.name,
              "sharelobby",
              e.name,
              function () {}
            );
          },
          getMenuOptions: function (e) {
            if (e.isLocal) return [{ id: "profile", text: "Profile" }];
            var t = -1 !== e.channelsAway.indexOf(this.channel.id),
              n = [{ id: "profile", text: "Profile" }];
            if (
              (l.a.localUser.settings.report > 0 &&
                n.push({ id: "report", text: "Report" }),
              n.push({
                id: "challenge",
                text: "Challenge",
                disabled: e.away || e.playing || t || e.ignored,
              }),
              n.push({
                id: "spectate",
                text: "Spectate",
                disabled: !this.canSpectateUser(e.playing),
              }),
              n.push({
                id: "ignore",
                text: "Ignore",
                active: e.ignored,
                type: "checkbox",
              }),
              e.playing && e.playing.channelId !== this.channel.id)
            ) {
              var a = this.canJoinChannel(e.playing);
              n.push({
                id: "goto_playing_channel",
                text: 'Go to "playing" channel',
                disabled: !a,
              });
            }
            return n;
          },
          canSpectateUser: function (e) {
            return e && void 0 !== e.channelId;
          },
          canJoinChannel: function (e) {
            var t = l.a.localUser.channels.indexOf(e.channelId);
            return (
              e &&
              e.channelId &&
              (-1 !== t || !l.a.localUser.maxNumChannelsReached)
            );
          },
          onContextMenuItemClick: function (e) {
            switch (e) {
              case "challenge":
                if (
                  this.channel.ranked &&
                  l.a.localUser.settings.ranked &&
                  this.contextMenuData.user.settings.ranked
                ) {
                  var t = this;
                  a.a.nextTick(function () {
                    t.showRankedContextMenu(
                      t.contextMenuData.user,
                      t.contextMenuData.position,
                      t.contextMenuData.limitRect
                    );
                  });
                } else this.challengeUser(this.contextMenuData.user);
                break;
              case "challengeUnranked":
                this.challengeUser(this.contextMenuData.user, 0);
                break;
              case "challengeFT2":
                this.challengeUser(this.contextMenuData.user, 2);
                break;
              case "challengeFT3":
                this.challengeUser(this.contextMenuData.user, 3);
                break;
              case "challengeFT5":
                this.challengeUser(this.contextMenuData.user, 5);
                break;
              case "challengeFT10":
                this.challengeUser(this.contextMenuData.user, 10);
                break;
              case "challengeFT20":
                this.challengeUser(this.contextMenuData.user, 20);
                break;
              case "profile":
                this.viewProfile(this.contextMenuData.user);
                break;
              case "report":
                this.reportProfile(this.contextMenuData.user);
                break;
              case "spectate":
                this.spectateMatch(this.contextMenuData.user);
                break;
              case "goto_playing_channel":
                this.$emit(
                  "goto-channel-by-gameid",
                  this.contextMenuData.user.playing.gameId
                );
                break;
              case "ignore":
                this.$emit(
                  "ignore-user",
                  this.contextMenuData.user.id,
                  !this.contextMenuData.user.ignored
                );
                break;
              case "sharelobby":
                this.shareLobby(this.contextMenuData.user);
            }
          },
          rebuildUsersLists: function () {
            (this.usersOnline = []),
              (this.usersAway = []),
              (this.usersIgnored = []);
            var e = this;
            i.a.forEach(this.users, function (t) {
              t.playing
                ? (t.playing.channelId !== e.channel.id || t.playing.hidden) &&
                  (t.ignored ? e.usersIgnored.push(t) : e.usersAway.push(t))
                : t.ignored
                ? e.usersIgnored.push(t)
                : t.away || -1 !== t.channelsAway.indexOf(e.channel.id)
                ? e.usersAway.push(t)
                : e.usersOnline.push(t);
            });
            var t = function (t) {
              return i.a.sortBy(t, function (t) {
                if ("rank" === l.a.localUser.settings.usersSortBy)
                  return -t.channelRank[e.channel.id] || 0;
                var n = t[l.a.localUser.settings.usersSortBy];
                return i.a.isString(n) && (n = n.toLowerCase()), n;
              });
            };
            (this.usersOnline = t(this.usersOnline)),
              (this.usersAway = t(this.usersAway)),
              (this.usersIgnored = t(this.usersIgnored)),
              (this.channelAway =
                -1 !== l.a.localUser.channelsAway.indexOf(e.channel.id));
          },
          onChannelAway: function () {
            (this.channelAway = !this.channelAway),
              u.a.setAway(this.channelAway, this.channel.id);
          },
          changeSorting: function () {
            var e =
              (d.indexOf(l.a.localUser.settings.usersSortBy) + 1) % d.length;
            (l.a.localUser.settings.usersSortBy = d[e]),
              u.a.updateUser({ users_sort_by: d[e] }),
              this.$emit("sorting-changed");
          },
        },
      };
    },
    function (e, t) {},
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    function (e, t) {},
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      n(133);
      var a = n(0)(n(61), n(217), "data-v-15f58fab", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(131);
      var a = n(0)(n(62), n(215), "data-v-0e715a5a", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(163);
      var a = n(0)(n(63), n(247), "data-v-f90dc3c6", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(143);
      var a = n(0)(n(64), n(227), "data-v-450212dd", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(160);
      var a = n(0)(n(65), n(244), "data-v-af1abf36", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(137);
      var a = n(0)(n(67), n(221), "data-v-29dba106", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(139);
      var a = n(0)(n(68), n(223), "data-v-30141e66", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(150);
      var a = n(0)(n(69), n(234), "data-v-5e94ebda", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(151);
      var a = n(0)(n(70), n(235), "data-v-5f09e302", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(136);
      var a = n(0)(n(71), n(220), "data-v-22062780", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(157);
      var a = n(0)(n(72), n(241), "data-v-8bf2961e", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(145);
      var a = n(0)(n(73), n(229), "data-v-4c05a9e2", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(146);
      var a = n(0)(n(74), n(230), "data-v-4d46d747", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(138);
      var a = n(0)(n(75), n(222), "data-v-2d56a7a6", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(156);
      var a = n(0)(n(76), n(240), "data-v-853cccc4", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(129);
      var a = n(0)(n(77), n(213), "data-v-04e9e5d6", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(153);
      var a = n(0)(n(78), n(237), "data-v-64b542dd", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(158);
      var a = n(0)(n(79), n(242), "data-v-97522630", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(162);
      var a = n(0)(n(80), n(246), "data-v-f6a537d2", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(148);
      var a = n(0)(n(81), n(232), "data-v-5b245ac3", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(161);
      var a = n(0)(n(82), n(245), "data-v-d99cace4", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(152);
      var a = n(0)(n(83), n(236), "data-v-62816b24", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(155);
      var a = n(0)(n(84), n(239), "data-v-7881dcfe", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(135);
      var a = n(0)(n(85), n(219), "data-v-1e573099", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(159);
      var a = n(0)(n(86), n(243), "data-v-97aa7636", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(144);
      var a = n(0)(n(87), n(228), "data-v-4ba73ecf", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(154);
      var a = n(0)(n(88), n(238), "data-v-6a99e135", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(140);
      var a = n(0)(n(89), n(224), "data-v-37509658", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(141);
      var a = n(0)(n(90), n(225), "data-v-395f893a", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(149);
      var a = n(0)(n(91), n(233), "data-v-5cb95e3e", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(130);
      var a = n(0)(n(92), n(214), "data-v-07147e41", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(142);
      var a = n(0)(n(93), n(226), "data-v-42a8da26", null);
      e.exports = a.exports;
    },
    function (e, t, n) {
      n(128);
      var a = n(0)(n(94), n(212), "data-v-00093d66", null);
      e.exports = a.exports;
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "usersListToolbar" }, [
            n("div", { staticClass: "usersListWrapper" }, [
              e.usersOnline.length > 0
                ? n("div", [
                    n(
                      "div",
                      {
                        staticClass: "usersOnlineTitle",
                        attrs: { title: e.sortingByMessage },
                        on: { click: e.changeSorting },
                      },
                      [
                        e._v("\n          Looking to play"),
                        n("span", [e._v(e._s(e.usersOnline.length))]),
                      ]
                    ),
                    e._v(" "),
                    n(
                      "div",
                      { staticClass: "usersOnlineList" },
                      [
                        e._l(e.usersOnline, function (t) {
                          return [
                            n("user-item", {
                              key: t.id,
                              attrs: { user: t, channel: e.channel },
                              on: {
                                "show-context-menu": e.showUserContextMenu,
                                "challenge-user": e.challengeUser,
                              },
                            }),
                          ];
                        }),
                      ],
                      2
                    ),
                  ])
                : e._e(),
              e._v(" "),
              e.matches.length > 0
                ? n("div", [
                    n("div", { staticClass: "matchesTitleWrapper" }, [
                      n("div", { staticClass: "matchesTitle" }, [
                        e._v("Playing "),
                      ]),
                      e._v(" "),
                      n("div", { staticClass: "matchesNumber" }, [
                        e._v(e._s(e.matchesNumber)),
                      ]),
                      e._v(" "),
                      n("div", { staticClass: "spectatorsIconWrapper" }, [
                        n(
                          "svg",
                          {
                            staticClass: "spectatorsIconSvg",
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "24",
                              height: "24",
                              viewBox: "0 0 24 24",
                            },
                          },
                          [
                            n("path", {
                              attrs: {
                                d: "M12 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0-2c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z",
                              },
                            }),
                            e._v(" "),
                            n("path", {
                              attrs: {
                                d: "M12 8c3.6 0 6.9 1.4 9.4 4-2.5 2.6-5.8 4-9.4 4s-6.9-1.4-9.4-4C5.1 9.5 8.4 8 12 8m0-2C7.1 6 2.8 8.4 0 12c2.8 3.6 7.1 6 12 6s9.2-2.3 12-6c-2.8-3.6-7.1-6-12-6z",
                              },
                            }),
                          ]
                        ),
                      ]),
                    ]),
                    e._v(" "),
                    n(
                      "div",
                      { staticClass: "matchesList" },
                      [
                        e._l(e.matches, function (t) {
                          return [
                            n("match-item", {
                              key: t.id,
                              attrs: { data: t, channel: e.channel },
                              on: {
                                "spectate-match": e.spectateMatch,
                                "show-context-menu-match":
                                  e.showMatchContextMenu,
                              },
                            }),
                          ];
                        }),
                      ],
                      2
                    ),
                  ])
                : e._e(),
              e._v(" "),
              e.usersAway.length > 0
                ? n("div", [
                    n(
                      "div",
                      {
                        staticClass: "usersAwayTitle",
                        attrs: { title: e.sortingByMessage },
                        on: { click: e.changeSorting },
                      },
                      [
                        e._v("\n          Not available"),
                        n("span", [e._v(e._s(e.usersAway.length))]),
                      ]
                    ),
                    e._v(" "),
                    n(
                      "div",
                      { staticClass: "usersAwayList" },
                      [
                        e._l(e.usersAway, function (t) {
                          return [
                            n("user-item", {
                              key: t.id,
                              attrs: { user: t, channel: e.channel },
                              on: {
                                "show-context-menu": e.showUserContextMenu,
                              },
                            }),
                          ];
                        }),
                      ],
                      2
                    ),
                  ])
                : e._e(),
              e._v(" "),
              e.usersIgnored.length > 0
                ? n("div", [
                    n(
                      "div",
                      {
                        staticClass: "usersIgnoredTitle",
                        attrs: { title: e.sortingByMessage },
                        on: { click: e.changeSorting },
                      },
                      [
                        e._v("\n          Ignored"),
                        n("span", [e._v(e._s(e.usersIgnored.length))]),
                      ]
                    ),
                    e._v(" "),
                    n(
                      "div",
                      { staticClass: "usersIgnoredList" },
                      [
                        e._l(e.usersIgnored, function (t) {
                          return [
                            n("user-item", {
                              key: t.id,
                              attrs: { user: t, channel: e.channel },
                              on: {
                                "show-context-menu": e.showUserContextMenu,
                              },
                            }),
                          ];
                        }),
                      ],
                      2
                    ),
                  ])
                : e._e(),
            ]),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { ref: "chatWrapper", staticClass: "chatWrapper" }, [
            n("div", { staticClass: "chatWrapperBg", style: e.channelBg }),
            e._v(" "),
            n(
              "div",
              {
                staticClass: "floatingNotificationsWrapper",
                on: {
                  mouseover: function (t) {
                    e.pauseOuterNotificationsTimer = !0;
                  },
                  mouseleave: function (t) {
                    e.pauseOuterNotificationsTimer = !1;
                  },
                },
              },
              [
                e._l(e.outerNotifications, function (t, a) {
                  return [
                    "mention" === t.type
                      ? n(
                          "div",
                          {
                            staticClass: "floatingNotificationsItem mention",
                            on: {
                              click: function (t) {
                                return e.onOuterNotificationClick(a);
                              },
                            },
                          },
                          [
                            e._v(
                              "\n          New mention on #" +
                                e._s(t.channel.name) +
                                "\n        "
                            ),
                          ]
                        )
                      : n(
                          "div",
                          {
                            staticClass: "floatingNotificationsItem challenge",
                          },
                          [
                            n(
                              "div",
                              {
                                staticClass: "title",
                                attrs: { title: t.channel.name },
                                on: {
                                  click: function (t) {
                                    return e.onOuterNotificationClick(a);
                                  },
                                },
                              },
                              [
                                e._v(
                                  "\n            New challenge on #" +
                                    e._s(t.channel.name) +
                                    "\n          "
                                ),
                              ]
                            ),
                            e._v(" "),
                            n("div", { staticClass: "details" }, [
                              n("div", { staticClass: "challenger" }, [
                                n("div", {
                                  staticClass: "flag",
                                  style: {
                                    backgroundImage:
                                      "url(" + e.flagSrc(t.user) + ")",
                                  },
                                  attrs: { title: t.user.country.full_name },
                                }),
                                e._v(" "),
                                n("div", { staticClass: "name" }, [
                                  e._v(
                                    "\n                " +
                                      e._s(t.user.name) +
                                      "\n              "
                                  ),
                                ]),
                                e._v(" "),
                                n("div", { staticClass: "rank" }, [
                                  n("img", {
                                    attrs: {
                                      src: e.rankSrc(t.user, t.channel),
                                    },
                                  }),
                                ]),
                                e._v(" "),
                                n("div", { staticClass: "ping" }, [
                                  n("img", {
                                    attrs: { src: e.pingSrc(t.user) },
                                  }),
                                ]),
                              ]),
                              e._v(" "),
                              n("div", { staticClass: "actions" }, [
                                n(
                                  "div",
                                  {
                                    staticClass: "button-generic accept",
                                    on: {
                                      click: function (t) {
                                        return e.onOuterChallengeNotificationClick(
                                          "accept",
                                          a
                                        );
                                      },
                                    },
                                  },
                                  [
                                    n(
                                      "svg",
                                      {
                                        staticClass: "icon challenge",
                                        attrs: {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          viewBox: "0 0 40 40",
                                        },
                                      },
                                      [
                                        n("path", {
                                          staticClass: "iconSvg challenge",
                                          attrs: {
                                            d: "M36.3 16.9c-.6-.6-1.2-.9-2-1 1.3-1.5 1.3-3.7-.2-5.2l-.1-.1c-.7-.7-1.6-1-2.6-1.1.3-1.3 0-2.7-1-3.7-.9-.9-2-1.2-3.2-1.1v-.4c0-1-.4-2-1.1-2.7-1.5-1.5-3.9-1.5-5.4 0l-3.1 3.1c-.9-.2-1.9-.2-3 0-1.7.5-3.6 1.6-5.2 3.1-3.1 3.1-5 8.2-.8 13.1l-7.2 7.2L13 39.7l7.2-7.2c1 .7 2.2.9 3.4.7 3.2-.6 6.2-4.1 7.4-6.6.7-.2 1.3-.5 1.9-1l3.3-3.3c.7-.7 1.1-1.7 1.1-2.7s-.3-2-1-2.7zm-3.5-4.8c.7.7.7 1.8 0 2.5L27.4 20c-.7.7-1.8.7-2.5 0h-.2c-.7-.7-.7-1.8 0-2.5l5.4-5.4c.7-.8 1.9-.8 2.7 0zm-3.7-4.8c.7.7.7 1.9 0 2.6l-3.1 3c-.2-.7-.5-1.4-1.1-2l-1-1 2.6-2.6c.7-.8 1.9-.8 2.6 0zM22.3 3c.7-.7 1.9-.7 2.6 0 .3.3.5.8.5 1.3s-.2 1-.5 1.3l-2.6 2.6L20 6c-.1-.1-.2-.2-.4-.3L22.3 3zm1.1 28.3c-.9.2-1.7-.1-2.4-.8l-.7-.7-7.1 7.1-8.8-8.8 7.1-7.1-.7-.7c-4-4-2.6-8.3.1-11 1.3-1.3 2.8-2.2 4.3-2.5 1-.2 2.4-.3 3.4.7l3.5 3.5 1.4 1.4c.7.7.7 1.3.6 1.8-.2.7-.7 1.2-1.4 1.4-.6.2-1.2 0-1.8-.6L18 12.1l-.8-.8-1.4 1.4.8.8c2.4 2.4 4.4 4.6 5.2 6.4.6 1.4.6 2.8-1.3 4.7l1.4 1.4c1.3-1.3 2-2.6 2.2-3.9.6.4 1.3.6 2 .6h.4c-.1 1.1.2 2.2 1.1 3.1.4.4.9.7 1.4.9-1.3 1.8-3.5 4.2-5.6 4.6zm11.5-10.4l-3.3 3.3c-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6l3.3-3.3c.4-.4.8-.5 1.3-.5s.9.2 1.3.5c.3.3.5.8.5 1.3s-.2 1-.5 1.3z",
                                          },
                                        }),
                                      ]
                                    ),
                                    e._v(
                                      "\n                " +
                                        e._s(e.getAcceptButtonLabel(t)) +
                                        "\n              "
                                    ),
                                  ]
                                ),
                                e._v(" "),
                                n(
                                  "div",
                                  {
                                    staticClass: "reject",
                                    on: {
                                      click: function (t) {
                                        return e.onOuterChallengeNotificationClick(
                                          "decline",
                                          a
                                        );
                                      },
                                    },
                                  },
                                  [
                                    e._v(
                                      "\n                Decline\n              "
                                    ),
                                  ]
                                ),
                              ]),
                            ]),
                          ]
                        ),
                  ];
                }),
              ],
              2
            ),
            e._v(" "),
            n(
              "div",
              {
                ref: "messagesContainer",
                staticClass: "chatContent",
                on: { scroll: e.onMessagesContainerScroll },
              },
              [
                "fc1" == e.channel.emulator
                  ? n("div", { staticClass: "fc1Notice" }, [
                      n("span", { staticClass: "mono" }, [
                        e._v(
                          "\n██╗     ███████╗ ██████╗  █████╗  ██████╗██╗   ██╗\n██║     ██╔════╝██╔════╝ ██╔══██╗██╔════╝╚██╗ ██╔╝\n██║     █████╗  ██║  ███╗███████║██║      ╚████╔╝\n██║     ██╔══╝  ██║   ██║██╔══██║██║       ╚██╔╝\n███████╗███████╗╚██████╔╝██║  ██║╚██████╗   ██║\n╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝   ╚═╝\n"
                        ),
                      ]),
                      e._v("\nYou joined a "),
                      n("strong", [e._v("Legacy channel")]),
                      e._v(
                        " that uses the old Fightcade emulator. The purpose of this channel is to cross-play with people that are still using the old Fightcade, consider joining the regular channels to use the new emulator with improved network and render code!"
                      ),
                      n("br"),
                      e._v("\nRead changelog "),
                      n(
                        "a",
                        {
                          attrs: {
                            href: "https://www.fightcade.com/changelog",
                            target: "_blank",
                          },
                        },
                        [e._v("https://www2.fightcade.com/changelog")]
                      ),
                      e._v("\nRead help "),
                      n(
                        "a",
                        {
                          attrs: {
                            href: "https://www.fightcade.com/help",
                            target: "_blank",
                          },
                        },
                        [e._v("https://www2.fightcade.com/help")]
                      ),
                      e._v("\nRead FAQ "),
                      n(
                        "a",
                        {
                          attrs: {
                            href: "https://www.fightcade.com/faq",
                            target: "_blank",
                          },
                        },
                        [e._v("https://www2.fightcade.com/faq")]
                      ),
                      e._v("\nCheck Discord for further help "),
                      n(
                        "a",
                        {
                          attrs: {
                            href: "https://discord.gg/EyERRSg",
                            target: "_blank",
                          },
                        },
                        [e._v("our official Discord server")]
                      ),
                    ])
                  : e._e(),
                e._v(" "),
                e._l(e.messages, function (t) {
                  return [
                    n(
                      "div",
                      {
                        staticClass: "messageWrapper",
                        class: e.getMessageClass(t),
                      },
                      [
                        "channel" === t.type
                          ? n("channel-message", {
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t },
                            })
                          : "motd" === t.type
                          ? n("motd-message", {
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t },
                            })
                          : "bot" === t.type
                          ? n("bot-message", {
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t },
                            })
                          : "endgame" === t.type
                          ? n("endgame-message", {
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t },
                            })
                          : "challengeError" === t.type
                          ? n("challenge-error-message", {
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t },
                            })
                          : "requestChallenge" === t.type
                          ? n("request-challenge-message", {
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t },
                              on: {
                                "cancel-challenge": e.cancelChallenge,
                                "state-challenge": e.stateChallenge,
                              },
                            })
                          : "requestRankedChallenge" === t.type
                          ? n("request-ranked-challenge-message", {
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t },
                              on: {
                                "ranked-challenge": e.rankedChallenge,
                                "cancel-challenge": e.cancelChallenge,
                                "state-challenge": e.stateChallenge,
                              },
                            })
                          : "challengeRequested" === t.type
                          ? n("challenge-requested-message", {
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t, channel: e.channel },
                              on: {
                                "decline-challenge": e.declineChallenge,
                                "accept-challenge": e.acceptChallenge,
                                "state-challenge": e.stateChallenge,
                              },
                            })
                          : "chat" === t.type
                          ? n("chat-message", {
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t },
                              on: {
                                "show-context-menu": e.showContextMenu,
                                "challenge-user": e.challengeUser,
                                "ignore-user": e.ignoreUser,
                                "goto-channel-by-gameid": e.gotoChannelByGameId,
                                "scroll-to-bottom": e.scrollToBottom,
                              },
                            })
                          : "terminal" === t.type
                          ? n("terminal-message", {
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t },
                            })
                          : n("raw-message", {
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t },
                            }),
                      ],
                      1
                    ),
                  ];
                }),
              ],
              2
            ),
            e._v(" "),
            n("div", { staticClass: "chatInput" }, [
              n(
                "div",
                { staticClass: "notificationsHelpersWrapper" },
                e._l(e.notificationsHelpers, function (t) {
                  return n(
                    "div",
                    { staticClass: "notificationsHelpersItem", class: t.type },
                    [
                      n("div", { staticClass: "title" }, [e._v(e._s(t.title))]),
                      e._v(" "),
                      n("div", { staticClass: "options" }, [
                        n(
                          "span",
                          {
                            staticClass: "discard",
                            on: {
                              click: function (n) {
                                return (
                                  n.stopPropagation(), e.discardUnseen(t.type)
                                );
                              },
                            },
                          },
                          [e._v("\n              Discard\n            ")]
                        ),
                        e._v(" "),
                        n(
                          "span",
                          {
                            staticClass: "goToFirst",
                            on: {
                              click: function (n) {
                                return (
                                  n.stopPropagation(), e.gotoUnseen(t.type)
                                );
                              },
                            },
                          },
                          [e._v("\n              Go to first ↑\n            ")]
                        ),
                      ]),
                    ]
                  );
                }),
                0
              ),
              e._v(" "),
              n(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: e.matchesList.length > 0,
                      expression: "matchesList.length > 0",
                    },
                  ],
                  staticClass: "matchesWrapper",
                },
                [
                  n("header", [
                    e._v(e._s(e.matchTitle) + "\n          "),
                    n("span", [e._v(e._s(e.matchString))]),
                  ]),
                  e._v(" "),
                  n(
                    "div",
                    {
                      ref: "matchesList",
                      staticClass: "matchesList",
                      on: { mousemove: e.calculateActiveMatch },
                    },
                    [
                      e._l(e.computedmatchesList(), function (t, a) {
                        return [
                          n(
                            "div",
                            {
                              ref: "match_" + a,
                              refInFor: !0,
                              staticClass: "match",
                              class: { active: t.active },
                              on: { mousedown: e.insertMatch },
                            },
                            [
                              "command" !== e.matchType
                                ? [
                                    n("img", {
                                      staticClass: "avatar",
                                      attrs: { src: e.avatarSrc(t) },
                                    }),
                                    e._v(" "),
                                    "user" === e.matchType
                                      ? [
                                          n("span", { staticClass: "text" }, [
                                            e._v(e._s(t.text)),
                                          ]),
                                        ]
                                      : [
                                          n(
                                            "span",
                                            { staticClass: "channel-fullName" },
                                            [e._v(e._s(t.channelName))]
                                          ),
                                          e._v(" "),
                                          n(
                                            "span",
                                            { staticClass: "channel-romName" },
                                            [e._v(e._s(t.gameId))]
                                          ),
                                        ],
                                  ]
                                : [
                                    n("span", { staticClass: "command" }, [
                                      e._v(e._s(t.text)),
                                    ]),
                                    e._v(" "),
                                    n("span", { staticClass: "description" }, [
                                      e._v(e._s(t.description)),
                                    ]),
                                  ],
                            ],
                            2
                          ),
                        ];
                      }),
                    ],
                    2
                  ),
                ]
              ),
              e._v(" "),
              n("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: e.inputText,
                    expression: "inputText",
                  },
                ],
                ref: "input",
                staticClass: "input",
                attrs: {
                  type: "text",
                  placeholder: "Send message to #" + e.channelName,
                  autocorrect: "off",
                  spellcheck: "false",
                },
                domProps: { value: e.inputText },
                on: {
                  keydown: e.onKeyDown,
                  focus: e.onFocus,
                  blur: e.onBlur,
                  input: function (t) {
                    t.target.composing || (e.inputText = t.target.value);
                  },
                },
              }),
            ]),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "mask", on: { click: e.close } }, [
            n(
              "div",
              { ref: "content", staticClass: "content", style: e.infoStyle },
              [
                n("div", { staticClass: "top" }, [
                  n("div", { staticClass: "avatar" }, [
                    n("img", {
                      staticClass: "image",
                      attrs: { src: e.avatarSrc },
                    }),
                    e._v(" "),
                    n("div", { class: e.stateClass }),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "username" }, [
                    e._v(e._s(e.user.name)),
                  ]),
                  e._v(" "),
                  n("img", { staticClass: "flag", attrs: { src: e.flagSrc } }),
                ]),
                e._v(" "),
                n("div", { staticClass: "bottom" }, [
                  e._v("\n      [TODO: add user info]\n    "),
                ]),
              ]
            ),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "a",
            {
              staticClass: "buttonItemWrapper",
              class: { active: e.data.active },
              on: { click: e.select },
            },
            [
              "welcome-channel" === e.data.id
                ? n(
                    "svg",
                    {
                      staticClass: "searchIcon",
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "40",
                        height: "40",
                        viewBox: "0 0 40 40",
                      },
                    },
                    [
                      n("path", {
                        attrs: {
                          d: "M25 0c-8.3 0-15 6.7-15 15 0 2.3.5 4.5 1.5 6.5L0 33l7 7 11.5-11.5c2 1 4.2 1.5 6.5 1.5 8.3 0 15-6.7 15-15S33.3 0 25 0zM7 37.2L2.8 33l9.2-9.2.5-.5c1.1 1.7 2.5 3.1 4.2 4.2L7 37.2zM25 28c-7.2 0-13-5.8-13-13S17.8 2 25 2s13 5.8 13 13-5.8 13-13 13z",
                        },
                      }),
                      e._v(" "),
                      n("path", {
                        attrs: {
                          d: "M25 5.4c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 17.2c-4.2 0-7.6-3.4-7.6-7.6 0-4.2 3.4-7.6 7.6-7.6s7.6 3.4 7.6 7.6c0 4.2-3.4 7.6-7.6 7.6z",
                        },
                      }),
                    ]
                  )
                : e._e(),
            ]
          );
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            { class: e.global.activeTheme.class, attrs: { id: "app" } },
            [
              n(
                "div",
                {
                  staticClass: "autoLoginning",
                  class: { visible: e.autoLoginning },
                },
                [
                  e._m(0),
                  e._v(" "),
                  n("div", { staticClass: "loadingMessage" }, [
                    e._v("\n        Initializing...\n      "),
                  ]),
                ]
              ),
              e._v(" "),
              "disconnected" === e.status
                ? n("login", { ref: "login", on: { connect: e.connect } })
                : [
                    n(
                      "div",
                      {
                        staticClass: "initializingApp",
                        class: { visible: e.initializingApp },
                      },
                      [
                        n("div", { staticClass: "spinnerWrapper" }, [
                          n("div", { staticClass: "spinner" }),
                        ]),
                        e._v(" "),
                        n("div", { staticClass: "loadingMessage" }, [
                          e._v(
                            "\n            Loading your settings...\n          "
                          ),
                        ]),
                      ]
                    ),
                    e._v(" "),
                    n("main-toolbar", {
                      ref: "mainToolbar",
                      on: {
                        "select-channel": e.selectChannel,
                        "show-context-menu": e.showContextMenu,
                        "leave-channel": e.leaveChannel,
                        "decline-challenge": e.declineChallenge,
                        "accept-challenge": e.acceptChallenge,
                        "goto-chat-message": e.gotoChatMessage,
                        "channel-item-initialized": e.channelItemInitialized,
                      },
                    }),
                    e._v(" "),
                    n("welcome-channel", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: "welcome-channel" === e.activeChannelId,
                          expression: "activeChannelId === 'welcome-channel'",
                        },
                      ],
                      ref: "welcome-channel",
                      on: {
                        "join-channel": e.joinChannel,
                        "new-channel": e.newChannel,
                        "del-channel": e.delChannel,
                        "fav-channel": e.favChannel,
                        "select-channel": e.selectChannel,
                        initialized: e.onWelcomeChannelInitialized,
                      },
                    }),
                    e._v(" "),
                    n("search-channel", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: "search-channel" === e.activeChannelId,
                          expression: "activeChannelId === 'search-channel'",
                        },
                      ],
                      ref: "search-channel",
                      on: {
                        "join-channel": e.joinChannel,
                        "new-channel": e.newChannel,
                        "del-channel": e.delChannel,
                        "fav-channel": e.favChannel,
                        "select-channel": e.selectChannel,
                        initialized: e.onSearchChannelInitialized,
                      },
                    }),
                    e._v(" "),
                    n("about-channel", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: "about-channel" === e.activeChannelId,
                          expression: "activeChannelId === 'about-channel'",
                        },
                      ],
                      ref: "about-channel",
                      on: { "select-channel": e.selectChannel },
                    }),
                    e._v(" "),
                    n("patreon-channel", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: "patreon-channel" === e.activeChannelId,
                          expression: "activeChannelId === 'patreon-channel'",
                        },
                      ],
                      ref: "patreon-channel",
                      on: { "select-channel": e.selectChannel },
                    }),
                    e._v(" "),
                    e._l(e.channels, function (t) {
                      return [
                        e.global.isGameChannel(t.id)
                          ? n("channel", {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: t.id === e.activeChannelId,
                                  expression: "channel.id === activeChannelId",
                                },
                              ],
                              key: t.id,
                              ref: t.id,
                              refInFor: !0,
                              attrs: { data: t },
                              on: {
                                "show-context-menu": e.showContextMenu,
                                "new-notification": e.onNewNotification,
                                "goto-channel-by-gameid": e.gotoChannelByGameId,
                                "goto-chat-message": e.gotoChatMessage,
                                "decline-challenge": e.declineChallenge,
                                "accept-challenge": e.acceptChallenge,
                                "show-emojis-view": e.showEmojisView,
                                "leave-channel": e.leaveChannel,
                                "on-user-ignored": e.onUserIgnored,
                                "sorting-changed": e.onSortingChanged,
                              },
                            })
                          : e._e(),
                      ];
                    }),
                    e._v(" "),
                    null !== e.contextMenuData
                      ? n("context-menu", {
                          ref: "contextMenu",
                          attrs: { data: e.contextMenuData },
                          on: { close: e.closeContextMenu },
                        })
                      : e._e(),
                    e._v(" "),
                    null !== e.userInfoData
                      ? n("user-info", {
                          ref: "userInfo",
                          attrs: { user: e.userInfoData },
                          on: { close: e.closeUserInfoView },
                        })
                      : e._e(),
                  ],
            ],
            2
          );
        },
        staticRenderFns: [
          function () {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n("div", { staticClass: "spinnerWrapper" }, [
              n("div", { staticClass: "spinner" }),
            ]);
          },
        ],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "aboutWrapper" }, [
            n("div", { staticClass: "aboutHeader" }, [
              n("div", { staticClass: "aboutImage" }, [
                n("div", { staticClass: "fightcadeLogo" }, [
                  n(
                    "svg",
                    {
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "850",
                        height: "118",
                        viewBox: "0 0 850 118",
                      },
                    },
                    [
                      n("path", {
                        staticClass: "logoLetters",
                        attrs: {
                          d: "M201.6 47.6l-2.9 23.3h20.9c-4.3 7.7-12.4 12.9-21.8 12.9-13.8 0-25.1-11.3-25.1-25.1s11.3-25.9 25.1-25.9c7.6 0 14.3 4.3 19 9.6l16.2-28C226.2 6.3 213.7.6 201 .2c-32.3-1.1-61.7 26.2-61.7 58.5s26.2 58.6 58.6 58.6c32.4 0 56-26.2 56-58.6 0-3.8-.4-7.5-1.1-11.1h-51.2zm121.8-5.7h-25.3V0h-33.5v117.2h33.5V75.3h25.3v41.9h33.5V0h-33.5v41.9zM81.9 0H0l18.7 32.4 5.5 9.6H0v75.2h33.5V75.5h50.1l-24.2-42H86L81.9 0zm14.4 117.2h33.5V0H96.3v117.2zm459.4 0h36.8l18.8-38.4 18.1 38.4h36.8L611.3 0l-55.6 117.2zM370.1 0v33.5h23.4v83.7H427V33.5h26L457 0h-86.9zm343.4 0h-39.1v117.2h39.1c32.4 0 58.6-26.2 58.6-58.6 0-32.3-26.2-58.6-58.6-58.6zm0 83.8h-5.7V33.5h5.7c13.9 0 25.1 11.3 25.1 25.1s-11.2 25.2-25.1 25.2zM838 58.6l-14.5-25.1H850L845.9 0h-82.7L797 58.6l-33.8 58.6h82.7l4.1-33.5h-26.5L838 58.6zM515.4 33.5c8.3 0 15.6 4.1 20.2 10.3L553 13.7C542.8 5.2 529.7 0 515.4 0c-32.4 0-58.6 26.2-58.6 58.6s26.2 58.6 58.6 58.6c14.3 0 27.4-5.2 37.6-13.7l-17.4-30.1c-4.6 6.2-11.9 10.3-20.2 10.3-13.9 0-25.1-11.3-25.1-25.1s11.3-25.1 25.1-25.1z",
                        },
                      }),
                    ]
                  ),
                ]),
              ]),
              e._v(" "),
              e._m(0),
              e._v(" "),
              e._m(1),
              e._v(" "),
              n("div", { staticClass: "aboutHeaderBgOverlay" }),
            ]),
            e._v(" "),
            n("div", { staticClass: "aboutContentWrapper" }, [
              n("div", { staticClass: "aboutContent" }, [
                n("div", { staticClass: "patreonInfo" }, [
                  n("div", { staticClass: "image" }, [
                    n(
                      "svg",
                      {
                        attrs: {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "800",
                          height: "122",
                          viewBox: "0 0 800 122",
                        },
                      },
                      [
                        n("path", {
                          attrs: {
                            fill: "#fff",
                            d: "M785.8 114.8V7.2h7.9v107.7h-7.9v-.1zm-44-71.7h7.9v34.1h-8.2l-12.3-21.9v21.9h-7.9V43.1h8.2l12.3 22.2V43.1zm-51.7-.9c11.3 0 18 8.6 18 17.9 0 9.4-6.7 17.9-18 17.9-11.4 0-18.1-8.6-18.1-17.9 0-9.3 6.7-17.9 18.1-17.9zm10 17.9c0-5.6-3.8-10.8-10-10.8s-10 5.2-10 10.8c0 5.6 3.8 10.8 10 10.8 6.2.1 10-5.2 10-10.8zM562.5 49.9v-6.8h23.4v6.8h-7.8v27.3h-7.9V49.9h-7.7zm83.7 7.2h12.9v6.2h-12.9v7.5h12.9v6.3h-20.8v-34h20.8v6.3h-12.9v7.7zm-33.7-14c7.6 0 12.4 5.7 12.4 12.3 0 4.8-2.5 9-6.8 11l6.8 10.8h-9.2l-6-9.5H606v9.5h-7.9V43.1h14.4zm4.4 12.3c0-3.2-2.1-5.9-5.5-5.9H606v11.8h5.4c3.4 0 5.5-2.7 5.5-5.9zM547.1 73H535l-1.3 4.1h-8.4L537.5 43h7.3L557 77.2h-8.6l-1.3-4.2zM541 52.8l-4.2 14h8.3l-4.1-14zm-35.3-9.7c7.6 0 12.4 5.7 12.4 12.3s-4.9 12.3-12.4 12.3h-6.4v9.5h-7.9V43.1h14.3zm4.5 12.3c0-3.2-2.1-5.9-5.5-5.9h-5.4v11.8h5.4c3.3 0 5.5-2.7 5.5-5.9z",
                          },
                        }),
                        e._v(" "),
                        n("path", {
                          attrs: {
                            fill: "#fff",
                            d: "M421.1 38.1L400 59.3l-21.2-21.2-1.7 1.7L398.2 61l-21.1 21.2 1.7 1.7L400 62.7l21.1 21.2 1.8-1.7L401.7 61l21.2-21.2z",
                          },
                        }),
                        e._v(" "),
                        n("path", {
                          staticClass: "logoLetters",
                          attrs: {
                            d: "M244.1 81.9H231l-6.5-13.7-6.7 13.7h-13.2l19.8-41.8 19.7 41.8zM305.5 61l-5.2-9h9.5l-1.5-11.9h-29.5L290.9 61l-12.1 20.9h29.5l1.5-11.9h-9.5zM36.9 52l-1.4-11.9H6.2l6.7 11.5 2 3.5H6.2v26.8h12V67h17.9l-8.7-15zM40.6 40.1h12v41.8h-12zM121.7 40.1V55h-9V40.1h-12v41.8h12V67h9v14.9h12V40.1zM96.4 57.1H78.2l-1 8.3h7.5c-1.5 2.7-4.4 4.6-7.8 4.6-4.9 0-9-4-9-9s4-9.2 9-9.2c2.7 0 5.1 1.5 6.8 3.4l5.8-10c-2.4-2.9-6.9-4.9-11.4-5.1-11.5-.4-22 9.3-22 20.9S65.5 81.9 77 81.9 97 72.5 97 61c-.1-1.4-.3-2.7-.6-3.9zM169.4 40.1h-31V52h8.3v29.9h12V52h9.3zM197.5 66.3c-1.6 2.2-4.3 3.7-7.2 3.7-4.9 0-9-4-9-9s4-9 9-9c3 0 5.6 1.5 7.2 3.7l6.2-10.8c-3.6-3-8.3-4.9-13.4-4.9-11.6 0-20.9 9.4-20.9 20.9s9.4 20.9 20.9 20.9c5.1 0 9.8-1.8 13.4-4.9l-6.2-10.6z",
                          },
                        }),
                        e._v(" "),
                        n("path", {
                          staticClass: "logoLetters",
                          attrs: {
                            d: "M261 40.1h-14v41.8h14c11.6 0 20.9-9.4 20.9-20.9.1-11.6-9.3-20.9-20.9-20.9zm0 29.9h-2V52h2c4.9 0 9 4 9 9s-4 9-9 9z",
                          },
                        }),
                      ]
                    ),
                  ]),
                  e._v(" "),
                  e.userRole > 1
                    ? n("div", [
                        n("h3", [
                          e._v(
                            "\n              Thank you for helping Fightcade!\n            "
                          ),
                        ]),
                        e._v(" "),
                        n("h4", [e._v("\\o/")]),
                      ])
                    : n("div", [
                        n("h3", [
                          e._v(
                            "\n              Help us make a better Fightcade\n            "
                          ),
                        ]),
                        e._v(" "),
                        n(
                          "div",
                          {
                            staticClass: "button-generic learn-more",
                            on: { click: e.openPatreonChannel },
                          },
                          [e._v("\n              Learn more\n            ")]
                        ),
                      ]),
                ]),
                e._v(" "),
                n("div", { staticClass: "aboutFooterWrapper" }, [
                  n("div", { staticClass: "footerColumn social" }, [
                    n("div", { staticClass: "community" }, [
                      n("h2", [e._v("Join our community")]),
                      e._v(" "),
                      n(
                        "a",
                        {
                          attrs: {
                            target: "_blank",
                            href: "https://discord.gg/EyERRSg",
                          },
                        },
                        [
                          n(
                            "svg",
                            {
                              staticClass: "discordIcon",
                              attrs: {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 800 272.1",
                              },
                            },
                            [
                              n("path", {
                                attrs: {
                                  d: "M142.8 120.1c-5.7 0-10.2 4.9-10.2 11s4.6 11 10.2 11c5.7 0 10.2-4.9 10.2-11s-4.6-11-10.2-11zm-36.5 0c-5.7 0-10.2 4.9-10.2 11s4.6 11 10.2 11c5.7 0 10.2-4.9 10.2-11 .1-6.1-4.5-11-10.2-11z",
                                },
                              }),
                              e._v(" "),
                              n("path", {
                                attrs: {
                                  d: "M191.4 36.9h-134c-11.3 0-20.5 9.2-20.5 20.5v134c0 11.3 9.2 20.5 20.5 20.5h113.4l-5.3-18.3 12.8 11.8 12.1 11.1 21.6 18.7V57.4c-.1-11.3-9.3-20.5-20.6-20.5zm-38.6 129.5s-3.6-4.3-6.6-8c13.1-3.7 18.1-11.8 18.1-11.8-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.4-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.6-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.2-1.8-1-2.8-1.7-2.8-1.7s4.8 7.9 17.5 11.7c-3 3.8-6.7 8.2-6.7 8.2-22.1-.7-30.5-15.1-30.5-15.1 0-31.9 14.4-57.8 14.4-57.8 14.4-10.7 28-10.4 28-10.4l1 1.2c-18 5.1-26.2 13-26.2 13s2.2-1.2 5.9-2.8c10.7-4.7 19.2-5.9 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.5 0 0-7.9-7.5-24.9-12.6l1.4-1.6s13.7-.3 28 10.4c0 0 14.4 25.9 14.4 57.8 0-.1-8.4 14.3-30.5 15zm151-86.7h-33.2V117l22.1 19.9v-36.2h11.8c7.5 0 11.2 3.6 11.2 9.4v27.7c0 5.8-3.5 9.7-11.2 9.7h-34v21.1h33.2c17.8.1 34.5-8.8 34.5-29.2v-29.8c.1-20.8-16.6-29.9-34.4-29.9zm174 59.7v-30.6c0-11 19.8-13.5 25.8-2.5l18.3-7.4c-7.2-15.8-20.3-20.4-31.2-20.4-17.8 0-35.4 10.3-35.4 30.3v30.6c0 20.2 17.6 30.3 35 30.3 11.2 0 24.6-5.5 32-19.9l-19.6-9c-4.8 12.3-24.9 9.3-24.9-1.4zM417.3 113c-6.9-1.5-11.5-4-11.8-8.3.4-10.3 16.3-10.7 25.6-.8l14.7-11.3c-9.2-11.2-19.6-14.2-30.3-14.2-16.3 0-32.1 9.2-32.1 26.6 0 16.9 13 26 27.3 28.2 7.3 1 15.4 3.9 15.2 8.9-.6 9.5-20.2 9-29.1-1.8l-14.2 13.3c8.3 10.7 19.6 16.1 30.2 16.1 16.3 0 34.4-9.4 35.1-26.6 1-21.7-14.8-27.2-30.6-30.1zm-67 55.5h22.4V79.7h-22.4v88.8zM728 79.7h-33.2V117l22.1 19.9v-36.2h11.8c7.5 0 11.2 3.6 11.2 9.4v27.7c0 5.8-3.5 9.7-11.2 9.7h-34v21.1H728c17.8.1 34.5-8.8 34.5-29.2v-29.8c0-20.8-16.7-29.9-34.5-29.9zm-162.9-1.2c-18.4 0-36.7 10-36.7 30.5v30.3c0 20.3 18.4 30.5 36.9 30.5 18.4 0 36.7-10.2 36.7-30.5V109c0-20.4-18.5-30.5-36.9-30.5zm14.4 60.8c0 6.4-7.2 9.7-14.3 9.7-7.2 0-14.4-3.1-14.4-9.7V109c0-6.5 7-10 14-10 7.3 0 14.7 3.1 14.7 10v30.3zM682.4 109c-.5-20.8-14.7-29.2-33-29.2h-35.5v88.8h22.7v-28.2h4l20.6 28.2h28L665 138.1c10.7-3.4 17.4-12.7 17.4-29.1zm-32.6 12h-13.2v-20.3h13.2c14.1 0 14.1 20.3 0 20.3z",
                                },
                              }),
                            ]
                          ),
                        ]
                      ),
                    ]),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "footerColumn social" }, [
                    n("div", { staticClass: "socialNetworks" }, [
                      n("h2", [e._v("Social profiles")]),
                      e._v(" "),
                      n("div", { staticClass: "links" }, [
                        n(
                          "a",
                          {
                            attrs: {
                              target: "_blank",
                              href: "https://twitter.com/fightcade",
                            },
                          },
                          [
                            n(
                              "svg",
                              {
                                staticClass: "twitterIcon",
                                attrs: {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  width: "48",
                                  height: "48",
                                  viewBox: "0 0 100 100",
                                },
                              },
                              [
                                n("path", {
                                  staticClass: "twitterIcon_bg",
                                  attrs: {
                                    d: "M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm25.1 40.5v1.6C75.1 58 63 76.4 40.9 76.4c-6.8 0-13.1-2-18.5-5.4.9.1 1.9.2 2.9.2 5.6 0 10.8-1.9 15-5.2-5.3-.1-9.7-3.6-11.3-8.4.7.1 1.5.2 2.3.2 1.1 0 2.2-.1 3.2-.4-5.5-1.1-9.7-6-9.7-11.8v-.2c1.6.9 3.5 1.4 5.5 1.5-3.2-2.2-5.4-5.9-5.4-10 0-2.2.6-4.3 1.6-6.1 5.9 7.3 14.8 12.1 24.8 12.6-.2-.9-.3-1.8-.3-2.7 0-6.7 5.4-12.1 12.1-12.1 3.5 0 6.6 1.5 8.8 3.8 2.7-.5 5.3-1.5 7.7-2.9-.9 2.8-2.8 5.2-5.3 6.7 2.4-.3 4.8-.9 6.9-1.9-1.7 2.4-3.7 4.5-6.1 6.2z",
                                  },
                                }),
                              ]
                            ),
                          ]
                        ),
                        e._v(" "),
                        n(
                          "a",
                          {
                            attrs: {
                              target: "_blank",
                              href: "https://www.facebook.com/Fightcade2",
                            },
                          },
                          [
                            n(
                              "svg",
                              {
                                staticClass: "facebookIcon",
                                attrs: {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  width: "48",
                                  height: "48",
                                  viewBox: "0 0 100 100",
                                },
                              },
                              [
                                n("path", {
                                  staticClass: "facebookIcon_bg",
                                  attrs: {
                                    d: "M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm15 30.7h-5.4c-4.3 0-5.1 2-5.1 5v6.6h10.1l-1.3 10.3h-8.8V79H43.9V52.5H35V42.2h8.9v-7.6c0-8.8 5.4-13.6 13.2-13.6 3.7 0 7 .3 7.9.4v9.3z",
                                  },
                                }),
                              ]
                            ),
                          ]
                        ),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]);
        },
        staticRenderFns: [
          function () {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n("div", { staticClass: "aboutLinks" }, [
              n("div", { staticClass: "aboutLinksItem" }, [
                n("div", { staticClass: "title" }, [
                  e._v("\n          What is Fightcade?\n        "),
                ]),
                e._v(" "),
                n(
                  "a",
                  {
                    attrs: {
                      href: "https://www.fightcade.com/about",
                      target: "_blank",
                    },
                  },
                  [e._v("About")]
                ),
              ]),
              e._v(" "),
              n("div", { staticClass: "aboutLinksItem" }, [
                n("div", { staticClass: "title" }, [
                  e._v("\n          First time here?\n        "),
                ]),
                e._v(" "),
                n(
                  "a",
                  {
                    attrs: {
                      href: "https://www.fightcade.com/help",
                      target: "_blank",
                    },
                  },
                  [e._v("Read the manual")]
                ),
              ]),
              e._v(" "),
              n("div", { staticClass: "aboutLinksItem" }, [
                n("div", { staticClass: "title" }, [
                  e._v("\n          Got questions?\n        "),
                ]),
                e._v(" "),
                n(
                  "a",
                  {
                    attrs: {
                      href: "https://www.fightcade.com/faq",
                      target: "_blank",
                    },
                  },
                  [e._v("F.A.Q.")]
                ),
              ]),
            ]);
          },
          function () {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n("div", { staticClass: "aboutHeaderBgWrapper" }, [
              n("div", { staticClass: "aboutHeaderBg" }),
            ]);
          },
        ],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement;
          return (e._self._c || t)("div");
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return "separator" !== e.data.id
            ? n(
                "div",
                {
                  class: [e.itemType, e.itemClass, e.data.id],
                  attrs: { title: e.data.title },
                  on: {
                    click: function (t) {
                      return (
                        t.stopPropagation(), e.click.apply(null, arguments)
                      );
                    },
                  },
                },
                [
                  "challenge" === e.data.id
                    ? [
                        n(
                          "svg",
                          {
                            staticClass: "icon challenge",
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              viewBox: "0 0 40 40",
                            },
                          },
                          [
                            n("path", {
                              staticClass: "iconSvg challenge",
                              attrs: {
                                d: "M36.3 16.9c-.6-.6-1.2-.9-2-1 1.3-1.5 1.3-3.7-.2-5.2l-.1-.1c-.7-.7-1.6-1-2.6-1.1.3-1.3 0-2.7-1-3.7-.9-.9-2-1.2-3.2-1.1v-.4c0-1-.4-2-1.1-2.7-1.5-1.5-3.9-1.5-5.4 0l-3.1 3.1c-.9-.2-1.9-.2-3 0-1.7.5-3.6 1.6-5.2 3.1-3.1 3.1-5 8.2-.8 13.1l-7.2 7.2L13 39.7l7.2-7.2c1 .7 2.2.9 3.4.7 3.2-.6 6.2-4.1 7.4-6.6.7-.2 1.3-.5 1.9-1l3.3-3.3c.7-.7 1.1-1.7 1.1-2.7s-.3-2-1-2.7zm-3.5-4.8c.7.7.7 1.8 0 2.5L27.4 20c-.7.7-1.8.7-2.5 0h-.2c-.7-.7-.7-1.8 0-2.5l5.4-5.4c.7-.8 1.9-.8 2.7 0zm-3.7-4.8c.7.7.7 1.9 0 2.6l-3.1 3c-.2-.7-.5-1.4-1.1-2l-1-1 2.6-2.6c.7-.8 1.9-.8 2.6 0zM22.3 3c.7-.7 1.9-.7 2.6 0 .3.3.5.8.5 1.3s-.2 1-.5 1.3l-2.6 2.6L20 6c-.1-.1-.2-.2-.4-.3L22.3 3zm1.1 28.3c-.9.2-1.7-.1-2.4-.8l-.7-.7-7.1 7.1-8.8-8.8 7.1-7.1-.7-.7c-4-4-2.6-8.3.1-11 1.3-1.3 2.8-2.2 4.3-2.5 1-.2 2.4-.3 3.4.7l3.5 3.5 1.4 1.4c.7.7.7 1.3.6 1.8-.2.7-.7 1.2-1.4 1.4-.6.2-1.2 0-1.8-.6L18 12.1l-.8-.8-1.4 1.4.8.8c2.4 2.4 4.4 4.6 5.2 6.4.6 1.4.6 2.8-1.3 4.7l1.4 1.4c1.3-1.3 2-2.6 2.2-3.9.6.4 1.3.6 2 .6h.4c-.1 1.1.2 2.2 1.1 3.1.4.4.9.7 1.4.9-1.3 1.8-3.5 4.2-5.6 4.6zm11.5-10.4l-3.3 3.3c-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6l3.3-3.3c.4-.4.8-.5 1.3-.5s.9.2 1.3.5c.3.3.5.8.5 1.3s-.2 1-.5 1.3z",
                              },
                            }),
                          ]
                        ),
                      ]
                    : e._e(),
                  e._v(" "),
                  "checkbox" === e.data.type
                    ? n("div", { staticClass: "booleanButton" }, [
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.data.active,
                              expression: "data.active",
                            },
                          ],
                          attrs: { type: "checkbox", id: "booleanToggle" },
                          domProps: {
                            checked: Array.isArray(e.data.active)
                              ? e._i(e.data.active, null) > -1
                              : e.data.active,
                          },
                          on: {
                            change: function (t) {
                              var n = e.data.active,
                                a = t.target,
                                s = !!a.checked;
                              if (Array.isArray(n)) {
                                var i = e._i(n, null);
                                a.checked
                                  ? i < 0 &&
                                    e.$set(e.data, "active", n.concat([null]))
                                  : i > -1 &&
                                    e.$set(
                                      e.data,
                                      "active",
                                      n.slice(0, i).concat(n.slice(i + 1))
                                    );
                              } else e.$set(e.data, "active", s);
                            },
                          },
                        }),
                        e._v(" "),
                        n("span", [e._v(e._s(e.data.text))]),
                        e._v(" "),
                        n("div", { staticClass: "booleanCheckbox" }),
                        e._v(" "),
                        n("label", { attrs: { for: "booleanToggle" } }),
                      ])
                    : n("div", { staticClass: "text" }, [
                        e._v(e._s(e.data.text)),
                      ]),
                ],
                2
              )
            : e._e();
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "welcomeWrapper" }, [
            n(
              "div",
              { staticClass: "contentWrapper" },
              [
                n("header", [
                  n("div", { staticClass: "inputWrapper" }, [
                    n("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: e.textFilter,
                          expression: "textFilter",
                        },
                      ],
                      ref: "textFilter",
                      staticClass: "text-filter",
                      attrs: {
                        type: "text",
                        autocorrect: "off",
                        spellcheck: "false",
                        placeholder: "Search games",
                      },
                      domProps: { value: e.textFilter },
                      on: {
                        input: function (t) {
                          t.target.composing || (e.textFilter = t.target.value);
                        },
                      },
                    }),
                    e._v(" "),
                    n(
                      "div",
                      {
                        staticClass: "filtersButton",
                        class: { active: e.openedFilters },
                        on: { click: e.toggleFilters },
                      },
                      [
                        n(
                          "svg",
                          {
                            staticClass: "filtersButtonIcon",
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "40",
                              height: "40",
                              viewBox: "0 0 40 40",
                            },
                          },
                          [
                            n("path", {
                              attrs: {
                                d: "M9 0h2v10H9zM9 21h2v19H9zM19 0h2v21h-2zM19 32h2v8h-2zM29 0h2v14h-2zM29 25h2v15h-2z",
                              },
                            }),
                            e._v(" "),
                            n("path", {
                              attrs: {
                                d: "M11 11v9H9v-9h2m2-2H7v13h6V9zM21 22v9h-2v-9h2m2-2h-6v13h6V20zM31 15v9h-2v-9h2m2-2h-6v13h6V13z",
                              },
                            }),
                          ]
                        ),
                      ]
                    ),
                  ]),
                  e._v(" "),
                  n(
                    "div",
                    {
                      staticClass: "filtersWrapper",
                      class: { active: e.openedFilters },
                    },
                    [
                      n("div", { staticClass: "filtersList" }, [
                        n("div", { staticClass: "filterItem genre" }, [
                          n("div", { staticClass: "title" }, [e._v("Genre")]),
                          e._v(" "),
                          n(
                            "select",
                            {
                              ref: "genreFilter",
                              staticClass: "selectValue",
                              on: {
                                change: function (t) {
                                  return e.onChangeFilter();
                                },
                              },
                            },
                            e._l(e.genres, function (t, a) {
                              return n("option", { domProps: { value: a } }, [
                                e._v(
                                  "\n                " +
                                    e._s(t) +
                                    "\n              "
                                ),
                              ]);
                            }),
                            0
                          ),
                        ]),
                        e._v(" "),
                        n("div", { staticClass: "filterItem year" }, [
                          n("div", { staticClass: "title" }, [
                            e._v("Release year"),
                          ]),
                          e._v(" "),
                          n(
                            "select",
                            {
                              ref: "yearFilter",
                              staticClass: "selectValue",
                              on: {
                                change: function (t) {
                                  return e.onChangeFilter();
                                },
                              },
                            },
                            e._l(e.years, function (t, a) {
                              return n("option", { domProps: { value: a } }, [
                                e._v(
                                  "\n                " +
                                    e._s(t) +
                                    "\n              "
                                ),
                              ]);
                            }),
                            0
                          ),
                        ]),
                        e._v(" "),
                        n("div", { staticClass: "filterItem system" }, [
                          n("div", { staticClass: "title" }, [e._v("System")]),
                          e._v(" "),
                          n(
                            "select",
                            {
                              ref: "systemFilter",
                              staticClass: "selectValue",
                              on: {
                                change: function (t) {
                                  return e.onChangeFilter();
                                },
                              },
                            },
                            e._l(e.systems, function (t, a) {
                              return n("option", { domProps: { value: a } }, [
                                e._v(
                                  "\n                " +
                                    e._s(t) +
                                    "\n              "
                                ),
                              ]);
                            }),
                            0
                          ),
                        ]),
                        e._v(" "),
                        n("div", { staticClass: "filterItem ranked" }, [
                          n("div", { staticClass: "title" }, [e._v("Ranked")]),
                          e._v(" "),
                          n(
                            "select",
                            {
                              ref: "rankedFilter",
                              staticClass: "selectValue",
                              on: {
                                change: function (t) {
                                  return e.onChangeFilter();
                                },
                              },
                            },
                            e._l(e.rankedOptions, function (t, a) {
                              return n("option", { domProps: { value: a } }, [
                                e._v(
                                  "\n                " +
                                    e._s(t) +
                                    "\n              "
                                ),
                              ]);
                            }),
                            0
                          ),
                        ]),
                      ]),
                    ]
                  ),
                ]),
                e._v(" "),
                n(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: e.fetchingData,
                        expression: "fetchingData",
                      },
                    ],
                    staticClass: "spinnerWrapper",
                  },
                  [n("div", { staticClass: "spinner" })]
                ),
                e._v(" "),
                e.fetchingData
                  ? e._e()
                  : e._l(e.results, function (t) {
                      return n(
                        "div",
                        [
                          t.channels && t.channels.length > 0
                            ? n("welcome-list", {
                                attrs: { title: t.title, channels: t.channels },
                                on: {
                                  "join-channel": e.joinChannel,
                                  "new-channel": e.newChannel,
                                  "del-channel": e.delChannel,
                                  "fav-channel": e.favChannel,
                                  "select-channel": e.selectChannel,
                                },
                              })
                            : e._e(),
                          e._v(" "),
                          t.categories && t.categories.length > 0
                            ? n("welcome-list", {
                                attrs: {
                                  title: t.title,
                                  categories: t.categories,
                                },
                                on: {
                                  "join-channel": e.joinChannel,
                                  "select-channel": e.selectChannel,
                                },
                              })
                            : e._e(),
                          e._v(" "),
                          t.events && t.events.length > 0
                            ? n("welcome-list", {
                                attrs: { title: t.title, events: t.events },
                                on: {
                                  "join-channel": e.joinChannel,
                                  "select-channel": e.selectChannel,
                                },
                              })
                            : e._e(),
                        ],
                        1
                      );
                    }),
              ],
              2
            ),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            {
              staticClass: "eventPreviewWrapper",
              attrs: { title: e.event.name },
            },
            [
              n(
                "div",
                {
                  directives: [
                    {
                      name: "lazy",
                      rawName: "v-lazy:background-image",
                      value: e.eventThumbnail(e.event),
                      expression: "eventThumbnail(event)",
                      arg: "background-image",
                    },
                  ],
                  staticClass: "thumbnail",
                },
                [
                  n("div", { staticClass: "eventInfoWrapper" }, [
                    n("div", { staticClass: "name" }, [
                      e._v(e._s(e.eventInfo(e.event))),
                    ]),
                    e._v(" "),
                    n("div", { staticClass: "date" }, [
                      e._v(e._s(e.eventDate(e.event))),
                    ]),
                  ]),
                ]
              ),
              e._v(" "),
              n("div", { staticClass: "eventActions" }, [
                n(
                  "a",
                  {
                    staticClass: "button-generic linkButton",
                    attrs: { title: e.infoButtonTitle(e.event) },
                    on: {
                      click: function (t) {
                        return e.infoButtonClicked(e.event);
                      },
                    },
                  },
                  [e._v("\n      Info\n    ")]
                ),
                e._v(" "),
                e.channelIsAvaibleForUser(e.event.channel) &&
                !e.channelIsDisabled(e.event.channel)
                  ? n(
                      "a",
                      {
                        staticClass: "button-generic joinButton",
                        attrs: { title: e.event.name },
                        on: {
                          click: function (t) {
                            return e.joinChannel(e.event.channel);
                          },
                        },
                      },
                      [e._v("\n      Channel\n    ")]
                    )
                  : e._e(),
              ]),
            ]
          );
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "message", class: e.data.type }, [
            n("div", { staticClass: "challengeWrapper" }, [
              n("div", { ref: "line" }, [
                "active" === e.data.state && e.data.ranked
                  ? n("div", { staticClass: "title" }, [
                      n("strong", [e._v("Ranked Match")]),
                      e._v(" You have been challenged to a "),
                      n("strong", [e._v("FT" + e._s(e.data.ranked))]),
                      e._v("!\n      "),
                    ])
                  : n("div", { staticClass: "title" }, [
                      e._v("\n        " + e._s(e.message) + "\n      "),
                    ]),
                e._v(" "),
                "active" === e.data.state
                  ? n("div", { staticClass: "challengeContent" }, [
                      n("div", { staticClass: "userInfo" }, [
                        n("div", {
                          staticClass: "flag",
                          style: { backgroundImage: "url(" + e.flagSrc + ")" },
                          attrs: { title: e.data.opponent.country.full_name },
                        }),
                        e._v(" "),
                        n("div", { staticClass: "name" }, [
                          e._v(
                            "\n            " +
                              e._s(e.data.opponent.name) +
                              "\n          "
                          ),
                        ]),
                        e._v(" "),
                        n("div", { staticClass: "rank" }, [
                          n("img", { attrs: { src: e.rankSrc } }),
                        ]),
                        e._v(" "),
                        n("div", { staticClass: "ping" }, [
                          n("img", {
                            attrs: { src: e.pingSrc, title: e.pingTitle },
                          }),
                        ]),
                      ]),
                      e._v(" "),
                      n("div", { staticClass: "buttons" }, [
                        n(
                          "div",
                          {
                            staticClass: "accept-challenge button-generic",
                            on: {
                              click: function (t) {
                                return e.modifyChallenge("accept");
                              },
                            },
                          },
                          [e._v("Accept")]
                        ),
                        e._v(" "),
                        n(
                          "div",
                          {
                            staticClass: "decline-challenge",
                            on: {
                              click: function (t) {
                                return e.modifyChallenge("decline");
                              },
                            },
                          },
                          [e._v("Decline")]
                        ),
                      ]),
                    ])
                  : e._e(),
              ]),
            ]),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "searchResultsWrapper" }, [
            n("div", { staticClass: "titleWrapper" }, [
              e.title ? n("h3", [e._v(e._s(e.title))]) : e._e(),
            ]),
            e._v(" "),
            n(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: e.fetchingData,
                    expression: "fetchingData",
                  },
                ],
                staticClass: "spinnerWrapper",
              },
              [
                n("div", { staticClass: "spinner" }),
                e._v(" "),
                n("div", { staticClass: "message" }, [e._v("Loading...")]),
              ]
            ),
            e._v(" "),
            e.channels.length > 0
              ? n(
                  "div",
                  { staticClass: "searchResultsGrid" },
                  [
                    e.fetchingData
                      ? e._e()
                      : e._l(e.channels, function (t) {
                          return e.channelIsVisible(t)
                            ? n(
                                "div",
                                { staticClass: "channelWrapper" },
                                [
                                  n("channel-preview", {
                                    attrs: { channel: t },
                                    on: {
                                      "join-channel": e.joinChannel,
                                      "new-channel": e.newChannel,
                                      "del-channel": e.delChannel,
                                      "fav-channel": e.favChannel,
                                      "select-channel": e.selectChannel,
                                    },
                                  }),
                                ],
                                1
                              )
                            : e._e();
                        }),
                  ],
                  2
                )
              : e._e(),
            e._v(" "),
            e.footerIsVisible()
              ? n("div", { staticClass: "paginationWrapper" }, [
                  n("div", { staticClass: "buttons" }, [
                    n("div", { staticClass: "prevButtonWrapper" }, [
                      n(
                        "div",
                        {
                          staticClass: "button-alt",
                          class: { disabled: !e.prevButtonAvailable },
                          on: {
                            click: function (t) {
                              return e.gotoPageOffset(-1);
                            },
                          },
                        },
                        [e._v("\n          ‹ Previous page\n        ")]
                      ),
                    ]),
                    e._v(" "),
                    n("div", { staticClass: "nextButtonWrapper" }, [
                      n(
                        "div",
                        {
                          staticClass: "button-alt",
                          class: { disabled: !e.nextButtonAvailable },
                          on: {
                            click: function (t) {
                              return e.gotoPageOffset(1);
                            },
                          },
                        },
                        [e._v("\n          Next page ›\n        ")]
                      ),
                    ]),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "range" }, [
                    e._v("\n    Showing results "),
                    n("span", [e._v(e._s(e.pageRange))]),
                    e._v(" of "),
                    n("span", [e._v(e._s(e.totalChannels))]),
                  ]),
                ])
              : e._e(),
            e._v(" "),
            0 === e.channels.length
              ? n(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !e.fetchingData,
                        expression: "!fetchingData",
                      },
                    ],
                    staticClass: "no-results",
                  },
                  [
                    n("div", { staticClass: "emoji" }, [
                      e._v(e._s(e.noItemsInfo.emoji)),
                    ]),
                    e._v("\n    " + e._s(e.noItemsInfo.text) + "\n  "),
                  ]
                )
              : e._e(),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "notificationsWrapper" }, [
            n("div", { staticClass: "notificationsMaskBg" }),
            e._v(" "),
            n("div", {
              staticClass: "notificationsMask",
              on: {
                click: function (t) {
                  return (
                    t.stopPropagation(),
                    e.closeNotifications.apply(null, arguments)
                  );
                },
              },
            }),
            e._v(" "),
            n(
              "div",
              {
                staticClass: "notificationsSection",
                on: {
                  click: function (e) {
                    e.stopPropagation();
                  },
                },
              },
              [
                0 === e.notifications.length
                  ? n("div", { staticClass: "notifications-empty" }, [
                      n("div", { staticClass: "emoji" }, [
                        e._v(" ¯\\_(ツ)_/¯"),
                      ]),
                      e._v(" "),
                      e._m(0),
                    ])
                  : e._e(),
                e._v(" "),
                e._l(e.notifications, function (t, a) {
                  return [
                    "mention" === t.type
                      ? n(
                          "div",
                          {
                            staticClass: "notification-mention",
                            on: {
                              click: function (t) {
                                return e.onNotificationClick(a);
                              },
                            },
                          },
                          [
                            n(
                              "div",
                              {
                                ref: "notification_title",
                                refInFor: !0,
                                staticClass: "header",
                              },
                              [
                                e._v(
                                  "\n          " + e._s(t.title) + "\n        "
                                ),
                              ]
                            ),
                            e._v(" "),
                            n("div", { staticClass: "content" }, [
                              e._v(
                                "\n          " +
                                  e._s(t.message.text) +
                                  "\n        "
                              ),
                            ]),
                          ]
                        )
                      : n(
                          "div",
                          {
                            staticClass: "notification-challenge",
                            on: {
                              click: function (t) {
                                return e.onNotificationClick(a);
                              },
                            },
                          },
                          [
                            n(
                              "div",
                              {
                                ref: "notification_title",
                                refInFor: !0,
                                staticClass: "header",
                              },
                              [
                                e._v(
                                  "\n          " + e._s(t.title) + "\n        "
                                ),
                              ]
                            ),
                            e._v(" "),
                            n("div", { staticClass: "content" }, [
                              n("div", { staticClass: "challenger" }, [
                                n("div", {
                                  staticClass: "flag",
                                  style: {
                                    backgroundImage:
                                      "url(" + e.flagSrc(t.user) + ")",
                                  },
                                  attrs: { title: t.user.country.full_name },
                                }),
                                e._v(" "),
                                n("div", { staticClass: "name" }, [
                                  e._v(e._s(t.user.name)),
                                ]),
                                e._v(" "),
                                n("img", {
                                  attrs: { src: e.rankSrc(t.channel, t.user) },
                                }),
                                e._v(" "),
                                n("img", {
                                  attrs: {
                                    src: e.pingSrc(t.user),
                                    title: e.pingTitle(t.user),
                                  },
                                }),
                              ]),
                              e._v(" "),
                              n(
                                "div",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: "requested" === t.challengeType,
                                      expression:
                                        "notification.challengeType === 'requested'",
                                    },
                                  ],
                                  staticClass: "buttons",
                                },
                                [
                                  n(
                                    "div",
                                    {
                                      staticClass: " button-generic accept",
                                      on: {
                                        click: function (t) {
                                          return (
                                            t.stopPropagation(),
                                            e.onChallengeNotificationClick(
                                              "accept",
                                              a
                                            )
                                          );
                                        },
                                      },
                                    },
                                    [
                                      n(
                                        "svg",
                                        {
                                          staticClass: "icon challenge",
                                          attrs: {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 40 40",
                                          },
                                        },
                                        [
                                          n("path", {
                                            staticClass: "iconSvg challenge",
                                            attrs: {
                                              d: "M36.3 16.9c-.6-.6-1.2-.9-2-1 1.3-1.5 1.3-3.7-.2-5.2l-.1-.1c-.7-.7-1.6-1-2.6-1.1.3-1.3 0-2.7-1-3.7-.9-.9-2-1.2-3.2-1.1v-.4c0-1-.4-2-1.1-2.7-1.5-1.5-3.9-1.5-5.4 0l-3.1 3.1c-.9-.2-1.9-.2-3 0-1.7.5-3.6 1.6-5.2 3.1-3.1 3.1-5 8.2-.8 13.1l-7.2 7.2L13 39.7l7.2-7.2c1 .7 2.2.9 3.4.7 3.2-.6 6.2-4.1 7.4-6.6.7-.2 1.3-.5 1.9-1l3.3-3.3c.7-.7 1.1-1.7 1.1-2.7s-.3-2-1-2.7zm-3.5-4.8c.7.7.7 1.8 0 2.5L27.4 20c-.7.7-1.8.7-2.5 0h-.2c-.7-.7-.7-1.8 0-2.5l5.4-5.4c.7-.8 1.9-.8 2.7 0zm-3.7-4.8c.7.7.7 1.9 0 2.6l-3.1 3c-.2-.7-.5-1.4-1.1-2l-1-1 2.6-2.6c.7-.8 1.9-.8 2.6 0zM22.3 3c.7-.7 1.9-.7 2.6 0 .3.3.5.8.5 1.3s-.2 1-.5 1.3l-2.6 2.6L20 6c-.1-.1-.2-.2-.4-.3L22.3 3zm1.1 28.3c-.9.2-1.7-.1-2.4-.8l-.7-.7-7.1 7.1-8.8-8.8 7.1-7.1-.7-.7c-4-4-2.6-8.3.1-11 1.3-1.3 2.8-2.2 4.3-2.5 1-.2 2.4-.3 3.4.7l3.5 3.5 1.4 1.4c.7.7.7 1.3.6 1.8-.2.7-.7 1.2-1.4 1.4-.6.2-1.2 0-1.8-.6L18 12.1l-.8-.8-1.4 1.4.8.8c2.4 2.4 4.4 4.6 5.2 6.4.6 1.4.6 2.8-1.3 4.7l1.4 1.4c1.3-1.3 2-2.6 2.2-3.9.6.4 1.3.6 2 .6h.4c-.1 1.1.2 2.2 1.1 3.1.4.4.9.7 1.4.9-1.3 1.8-3.5 4.2-5.6 4.6zm11.5-10.4l-3.3 3.3c-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6l3.3-3.3c.4-.4.8-.5 1.3-.5s.9.2 1.3.5c.3.3.5.8.5 1.3s-.2 1-.5 1.3z",
                                            },
                                          }),
                                        ]
                                      ),
                                      e._v(
                                        "\n              " +
                                          e._s(t.acceptButtonLabel) +
                                          "\n            "
                                      ),
                                    ]
                                  ),
                                  e._v(" "),
                                  n(
                                    "div",
                                    {
                                      staticClass: "decline",
                                      on: {
                                        click: function (t) {
                                          return (
                                            t.stopPropagation(),
                                            e.onChallengeNotificationClick(
                                              "decline",
                                              a
                                            )
                                          );
                                        },
                                      },
                                    },
                                    [e._v("Decline")]
                                  ),
                                ]
                              ),
                            ]),
                          ]
                        ),
                  ];
                }),
              ],
              2
            ),
          ]);
        },
        staticRenderFns: [
          function () {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n("div", [n("strong", [e._v("No notifications yet.")])]);
          },
        ],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "settingsWrapper" }, [
            n("div", { staticClass: "settingsMaskBg" }),
            e._v(" "),
            n("div", {
              staticClass: "settingsMask",
              on: {
                click: function (t) {
                  return (
                    t.stopPropagation(), e.closeSettings.apply(null, arguments)
                  );
                },
              },
            }),
            e._v(" "),
            n(
              "div",
              {
                staticClass: "settingsSection",
                on: {
                  click: function (e) {
                    e.stopPropagation();
                  },
                },
              },
              [
                n(
                  "div",
                  {
                    staticClass: "userAvatarWrapper",
                    attrs: { title: "Change your avatar on gravatar.com" },
                  },
                  [
                    n(
                      "a",
                      {
                        attrs: {
                          href: "https://www.gravatar.com",
                          target: "_blank",
                        },
                      },
                      [
                        n("img", {
                          staticClass: "userAvatar",
                          attrs: { src: e.avatarSrc },
                        }),
                        e._v(" "),
                        n("div", { staticClass: "changeAvatar" }, [
                          e._v("\n        Click to change on gravatar\n      "),
                        ]),
                      ]
                    ),
                  ]
                ),
                e._v(" "),
                n("div", { staticClass: "userIdWrapper" }, [
                  n("div", { staticClass: "label" }, [e._v("Fightcade ID")]),
                  e._v(" "),
                  n("div", { staticClass: "userName" }, [
                    e._v(e._s(e.localUser.name)),
                  ]),
                ]),
                e._v(" "),
                n("div", { staticClass: "userEmailWrapper" }, [
                  n("div", { staticClass: "label" }, [e._v("E-mail")]),
                  e._v(" "),
                  n("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.localUser.email,
                        expression: "localUser.email",
                      },
                    ],
                    staticClass: "userEmail",
                    attrs: {
                      type: "email",
                      autocomplete: "on",
                      autocorrect: "off",
                      spellcheck: "false",
                    },
                    domProps: { value: e.localUser.email },
                    on: {
                      input: [
                        function (t) {
                          t.target.composing ||
                            e.$set(e.localUser, "email", t.target.value);
                        },
                        function (t) {
                          return e.startEditingValue("Email");
                        },
                      ],
                    },
                  }),
                  e._v(" "),
                  n(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: e.editingEmail,
                          expression: "editingEmail",
                        },
                      ],
                      staticClass: "button-generic save",
                      class: { spinner: e.savingEmail },
                      on: {
                        click: function (t) {
                          return e.saveValue("Email");
                        },
                      },
                    },
                    [e._v("Update")]
                  ),
                  e._v(" "),
                  n(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: null !== e.editingEmailMessage,
                          expression: "editingEmailMessage !== null",
                        },
                      ],
                      staticClass: "saveFeedback",
                      class: e.editingEmailMessageClass,
                    },
                    [e._v(e._s(e.editingEmailMessage))]
                  ),
                ]),
                e._v(" "),
                n("div", { staticClass: "userPasswordWrapper" }, [
                  n("div", { staticClass: "label" }, [e._v("Password")]),
                  e._v(" "),
                  n("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.password,
                        expression: "password",
                      },
                    ],
                    staticClass: "userPassword",
                    attrs: {
                      type: "password",
                      autocorrect: "off",
                      spellcheck: "false",
                      placeholder: "●●●●●●●●",
                    },
                    domProps: { value: e.password },
                    on: {
                      input: [
                        function (t) {
                          t.target.composing || (e.password = t.target.value);
                        },
                        function (t) {
                          e.editingPassword = !0;
                        },
                      ],
                    },
                  }),
                  e._v(" "),
                  n(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: e.editingPassword,
                          expression: "editingPassword",
                        },
                      ],
                      staticClass: "button-generic save",
                      class: { spinner: e.savingPassword },
                      on: {
                        click: function (t) {
                          return e.saveValue("Password");
                        },
                      },
                    },
                    [e._v("Update")]
                  ),
                  e._v(" "),
                  n(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: null !== e.editingPasswordMessage,
                          expression: "editingPasswordMessage !== null",
                        },
                      ],
                      staticClass: "saveFeedback",
                      class: e.editingPasswordMessageClass,
                    },
                    [e._v(e._s(e.editingPasswordMessage))]
                  ),
                ]),
                e._v(" "),
                n("div", { staticClass: "gamesOptions" }, [
                  n("div", { staticClass: "label" }, [e._v("Games")]),
                  e._v(" "),
                  n("div", { staticClass: "option" }, [
                    n("div", { staticClass: "title" }, [
                      e._v("Smoothing / Input lag"),
                    ]),
                    e._v(" "),
                    n(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.localUser.settings.delay,
                            expression: "localUser.settings.delay",
                          },
                        ],
                        staticClass: "selectValue",
                        on: {
                          change: [
                            function (t) {
                              var n = Array.prototype.filter
                                .call(t.target.options, function (e) {
                                  return e.selected;
                                })
                                .map(function (e) {
                                  return "_value" in e ? e._value : e.value;
                                });
                              e.$set(
                                e.localUser.settings,
                                "delay",
                                t.target.multiple ? n : n[0]
                              );
                            },
                            function (t) {
                              return e.saveSetting("delay");
                            },
                          ],
                        },
                      },
                      e._l(e.delayValues, function (t, a) {
                        return n("option", { domProps: { value: a - 1 } }, [
                          e._v("\n            " + e._s(t) + "\n          "),
                        ]);
                      }),
                      0
                    ),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "option" }, [
                    n("div", { staticClass: "title" }, [e._v("Ranked player")]),
                    e._v(" "),
                    n("div", { staticClass: "optionCheckboxWrapper" }, [
                      n("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.localUser.settings.ranked,
                            expression: "localUser.settings.ranked",
                          },
                        ],
                        attrs: { type: "checkbox", id: "rankedPlayer" },
                        domProps: {
                          checked: Array.isArray(e.localUser.settings.ranked)
                            ? e._i(e.localUser.settings.ranked, null) > -1
                            : e.localUser.settings.ranked,
                        },
                        on: {
                          change: [
                            function (t) {
                              var n = e.localUser.settings.ranked,
                                a = t.target,
                                s = !!a.checked;
                              if (Array.isArray(n)) {
                                var i = e._i(n, null);
                                a.checked
                                  ? i < 0 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "ranked",
                                      n.concat([null])
                                    )
                                  : i > -1 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "ranked",
                                      n.slice(0, i).concat(n.slice(i + 1))
                                    );
                              } else e.$set(e.localUser.settings, "ranked", s);
                            },
                            function (t) {
                              return e.saveSetting("ranked");
                            },
                          ],
                        },
                      }),
                      e._v(" "),
                      n("div", { staticClass: "optionCheckbox" }),
                      e._v(" "),
                      n("label", { attrs: { for: "rankedPlayer" } }),
                    ]),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "option" }, [
                    n("div", { staticClass: "title" }, [
                      e._v("Prevent low quality challenges"),
                    ]),
                    e._v(" "),
                    n("div", { staticClass: "optionCheckboxWrapper" }, [
                      n("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.localUser.settings.preventBadChallenges,
                            expression:
                              "localUser.settings.preventBadChallenges",
                          },
                        ],
                        attrs: { type: "checkbox", id: "preventBadChallenges" },
                        domProps: {
                          checked: Array.isArray(
                            e.localUser.settings.preventBadChallenges
                          )
                            ? e._i(
                                e.localUser.settings.preventBadChallenges,
                                null
                              ) > -1
                            : e.localUser.settings.preventBadChallenges,
                        },
                        on: {
                          change: [
                            function (t) {
                              var n = e.localUser.settings.preventBadChallenges,
                                a = t.target,
                                s = !!a.checked;
                              if (Array.isArray(n)) {
                                var i = e._i(n, null);
                                a.checked
                                  ? i < 0 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "preventBadChallenges",
                                      n.concat([null])
                                    )
                                  : i > -1 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "preventBadChallenges",
                                      n.slice(0, i).concat(n.slice(i + 1))
                                    );
                              } else
                                e.$set(
                                  e.localUser.settings,
                                  "preventBadChallenges",
                                  s
                                );
                            },
                            function (t) {
                              return e.saveSetting("preventBadChallenges");
                            },
                          ],
                        },
                      }),
                      e._v(" "),
                      n("div", { staticClass: "optionCheckbox" }),
                      e._v(" "),
                      n("label", { attrs: { for: "preventBadChallenges" } }),
                    ]),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "option" }, [
                    n(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !e.localUser.wlan,
                            expression: "!localUser.wlan",
                          },
                        ],
                        staticClass: "title",
                      },
                      [e._v("Prevent Wifi/VPN challenges")]
                    ),
                    e._v(" "),
                    n(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: e.localUser.wlan,
                            expression: "localUser.wlan",
                          },
                        ],
                        staticClass: "title",
                      },
                      [e._v("Prevent Wifi/VPN challenges (Get wired!)")]
                    ),
                    e._v(" "),
                    n("div", { staticClass: "optionCheckboxWrapper" }, [
                      n("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.localUser.settings.preventWifiChallenges,
                            expression:
                              "localUser.settings.preventWifiChallenges",
                          },
                        ],
                        attrs: {
                          type: "checkbox",
                          id: "preventWifiChallenges",
                        },
                        domProps: {
                          checked: Array.isArray(
                            e.localUser.settings.preventWifiChallenges
                          )
                            ? e._i(
                                e.localUser.settings.preventWifiChallenges,
                                null
                              ) > -1
                            : e.localUser.settings.preventWifiChallenges,
                        },
                        on: {
                          change: [
                            function (t) {
                              var n =
                                  e.localUser.settings.preventWifiChallenges,
                                a = t.target,
                                s = !!a.checked;
                              if (Array.isArray(n)) {
                                var i = e._i(n, null);
                                a.checked
                                  ? i < 0 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "preventWifiChallenges",
                                      n.concat([null])
                                    )
                                  : i > -1 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "preventWifiChallenges",
                                      n.slice(0, i).concat(n.slice(i + 1))
                                    );
                              } else
                                e.$set(
                                  e.localUser.settings,
                                  "preventWifiChallenges",
                                  s
                                );
                            },
                            function (t) {
                              return e.saveSetting("preventWifiChallenges");
                            },
                          ],
                        },
                      }),
                      e._v(" "),
                      n("div", { staticClass: "optionCheckbox" }),
                      e._v(" "),
                      n("label", { attrs: { for: "preventWifiChallenges" } }),
                    ]),
                  ]),
                  e._v(" "),
                  n(
                    "div",
                    {
                      staticClass: "option",
                      attrs: { disabled: !e.localUser.perks.disableSpectators },
                    },
                    [
                      n(
                        "div",
                        {
                          staticClass: "title",
                          attrs: {
                            disabled: !e.localUser.perks.disableSpectators,
                          },
                        },
                        [e._v("Disable Live Spectators")]
                      ),
                      e._v(" "),
                      n("div", { staticClass: "optionCheckboxWrapper" }, [
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.localUser.settings.disableSpectators,
                              expression:
                                "localUser.settings.disableSpectators",
                            },
                          ],
                          attrs: {
                            type: "checkbox",
                            id: "disableSpectators",
                            disabled: !e.localUser.perks.disableSpectators,
                          },
                          domProps: {
                            checked: Array.isArray(
                              e.localUser.settings.disableSpectators
                            )
                              ? e._i(
                                  e.localUser.settings.disableSpectators,
                                  null
                                ) > -1
                              : e.localUser.settings.disableSpectators,
                          },
                          on: {
                            change: [
                              function (t) {
                                var n = e.localUser.settings.disableSpectators,
                                  a = t.target,
                                  s = !!a.checked;
                                if (Array.isArray(n)) {
                                  var i = e._i(n, null);
                                  a.checked
                                    ? i < 0 &&
                                      e.$set(
                                        e.localUser.settings,
                                        "disableSpectators",
                                        n.concat([null])
                                      )
                                    : i > -1 &&
                                      e.$set(
                                        e.localUser.settings,
                                        "disableSpectators",
                                        n.slice(0, i).concat(n.slice(i + 1))
                                      );
                                } else
                                  e.$set(
                                    e.localUser.settings,
                                    "disableSpectators",
                                    s
                                  );
                              },
                              function (t) {
                                return e.saveSetting("disableSpectators");
                              },
                            ],
                          },
                        }),
                        e._v(" "),
                        n("div", { staticClass: "optionCheckbox" }),
                        e._v(" "),
                        n("label", { attrs: { for: "disableSpectators" } }),
                      ]),
                    ]
                  ),
                  e._v(" "),
                  e.localUser.perks.disableSpectators
                    ? e._e()
                    : n("div", { staticClass: "patronExclusive" }, [
                        n("div", { staticClass: "text" }, [
                          e._v(
                            "\n          This feature is only available for patrons.\n        "
                          ),
                        ]),
                        e._v(" "),
                        n(
                          "div",
                          {
                            staticClass: "button-generic",
                            on: { click: e.openPatreonChannel },
                          },
                          [e._v("\n          Learn more\n        ")]
                        ),
                      ]),
                ]),
                e._v(" "),
                n("div", { staticClass: "frontendOptions" }, [
                  n("div", { staticClass: "label" }, [e._v("Frontend")]),
                  e._v(" "),
                  n("div", { staticClass: "option" }, [
                    n("div", { staticClass: "title" }, [
                      e._v("Temporarily mute chat"),
                    ]),
                    e._v(" "),
                    n("div", { staticClass: "optionCheckboxWrapper" }, [
                      n("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.localUser.settings.chatMuted,
                            expression: "localUser.settings.chatMuted",
                          },
                        ],
                        attrs: { type: "checkbox", id: "chatMuted" },
                        domProps: {
                          checked: Array.isArray(e.localUser.settings.chatMuted)
                            ? e._i(e.localUser.settings.chatMuted, null) > -1
                            : e.localUser.settings.chatMuted,
                        },
                        on: {
                          change: [
                            function (t) {
                              var n = e.localUser.settings.chatMuted,
                                a = t.target,
                                s = !!a.checked;
                              if (Array.isArray(n)) {
                                var i = e._i(n, null);
                                a.checked
                                  ? i < 0 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "chatMuted",
                                      n.concat([null])
                                    )
                                  : i > -1 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "chatMuted",
                                      n.slice(0, i).concat(n.slice(i + 1))
                                    );
                              } else
                                e.$set(e.localUser.settings, "chatMuted", s);
                            },
                            function (t) {
                              return e.saveSetting("chatMuted");
                            },
                          ],
                        },
                      }),
                      e._v(" "),
                      n("div", { staticClass: "optionCheckbox" }),
                      e._v(" "),
                      n("label", { attrs: { for: "chatMuted" } }),
                    ]),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "option" }, [
                    n("div", { staticClass: "title" }, [e._v("Auto AFK")]),
                    e._v(" "),
                    n("div", { staticClass: "optionCheckboxWrapper" }, [
                      n("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.localUser.settings.autoAfk,
                            expression: "localUser.settings.autoAfk",
                          },
                        ],
                        attrs: { type: "checkbox", id: "autoAfk" },
                        domProps: {
                          checked: Array.isArray(e.localUser.settings.autoAfk)
                            ? e._i(e.localUser.settings.autoAfk, null) > -1
                            : e.localUser.settings.autoAfk,
                        },
                        on: {
                          change: [
                            function (t) {
                              var n = e.localUser.settings.autoAfk,
                                a = t.target,
                                s = !!a.checked;
                              if (Array.isArray(n)) {
                                var i = e._i(n, null);
                                a.checked
                                  ? i < 0 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "autoAfk",
                                      n.concat([null])
                                    )
                                  : i > -1 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "autoAfk",
                                      n.slice(0, i).concat(n.slice(i + 1))
                                    );
                              } else e.$set(e.localUser.settings, "autoAfk", s);
                            },
                            function (t) {
                              return e.saveSetting("autoAfk");
                            },
                          ],
                        },
                      }),
                      e._v(" "),
                      n("div", { staticClass: "optionCheckbox" }),
                      e._v(" "),
                      n("label", { attrs: { for: "autoAfk" } }),
                    ]),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "option" }, [
                    n(
                      "div",
                      {
                        staticClass: "title",
                        attrs: { disabled: !e.localUser.perks.themesAvailable },
                      },
                      [e._v("Color theme")]
                    ),
                    e._v(" "),
                    n(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.localUser.settings.theme,
                            expression: "localUser.settings.theme",
                          },
                        ],
                        staticClass: "selectValue",
                        attrs: { disabled: !e.localUser.perks.themesAvailable },
                        on: {
                          change: [
                            function (t) {
                              var n = Array.prototype.filter
                                .call(t.target.options, function (e) {
                                  return e.selected;
                                })
                                .map(function (e) {
                                  return "_value" in e ? e._value : e.value;
                                });
                              e.$set(
                                e.localUser.settings,
                                "theme",
                                t.target.multiple ? n : n[0]
                              );
                            },
                            function (t) {
                              return e.saveSetting("theme");
                            },
                          ],
                        },
                      },
                      e._l(e.themesValues, function (t) {
                        return n("option", { domProps: { value: t.id } }, [
                          e._v(
                            "\n            " + e._s(t.name) + "\n          "
                          ),
                        ]);
                      }),
                      0
                    ),
                  ]),
                  e._v(" "),
                  e.localUser.perks.themesAvailable
                    ? e._e()
                    : n("div", { staticClass: "patronExclusive" }, [
                        n("div", { staticClass: "text" }, [
                          e._v(
                            "\n          This feature is only available for patrons.\n        "
                          ),
                        ]),
                        e._v(" "),
                        n(
                          "div",
                          {
                            staticClass: "button-generic",
                            on: { click: e.openPatreonChannel },
                          },
                          [e._v("\n          Learn more\n        ")]
                        ),
                      ]),
                ]),
                e._v(" "),
                n("div", { staticClass: "notificationsOptions" }, [
                  n("div", { staticClass: "label" }, [e._v("Notifications")]),
                  e._v(" "),
                  n("div", { staticClass: "option" }, [
                    n("div", { staticClass: "title" }, [
                      e._v("Desktop notifications"),
                    ]),
                    e._v(" "),
                    n("div", { staticClass: "optionCheckboxWrapper" }, [
                      n("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.localUser.settings.desktopNotifications,
                            expression:
                              "localUser.settings.desktopNotifications",
                          },
                        ],
                        attrs: { type: "checkbox", id: "desktopNotifications" },
                        domProps: {
                          checked: Array.isArray(
                            e.localUser.settings.desktopNotifications
                          )
                            ? e._i(
                                e.localUser.settings.desktopNotifications,
                                null
                              ) > -1
                            : e.localUser.settings.desktopNotifications,
                        },
                        on: {
                          change: [
                            function (t) {
                              var n = e.localUser.settings.desktopNotifications,
                                a = t.target,
                                s = !!a.checked;
                              if (Array.isArray(n)) {
                                var i = e._i(n, null);
                                a.checked
                                  ? i < 0 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "desktopNotifications",
                                      n.concat([null])
                                    )
                                  : i > -1 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "desktopNotifications",
                                      n.slice(0, i).concat(n.slice(i + 1))
                                    );
                              } else
                                e.$set(
                                  e.localUser.settings,
                                  "desktopNotifications",
                                  s
                                );
                            },
                            function (t) {
                              return e.saveSetting("desktopNotifications");
                            },
                          ],
                        },
                      }),
                      e._v(" "),
                      n("div", { staticClass: "optionCheckbox" }),
                      e._v(" "),
                      n("label", { attrs: { for: "desktopNotifications" } }),
                    ]),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "option" }, [
                    n("div", { staticClass: "title" }, [
                      e._v("Sound notifications"),
                    ]),
                    e._v(" "),
                    n("div", { staticClass: "optionCheckboxWrapper" }, [
                      n("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.localUser.settings.soundNotifications,
                            expression: "localUser.settings.soundNotifications",
                          },
                        ],
                        attrs: { type: "checkbox", id: "soundNotifications" },
                        domProps: {
                          checked: Array.isArray(
                            e.localUser.settings.soundNotifications
                          )
                            ? e._i(
                                e.localUser.settings.soundNotifications,
                                null
                              ) > -1
                            : e.localUser.settings.soundNotifications,
                        },
                        on: {
                          change: [
                            function (t) {
                              var n = e.localUser.settings.soundNotifications,
                                a = t.target,
                                s = !!a.checked;
                              if (Array.isArray(n)) {
                                var i = e._i(n, null);
                                a.checked
                                  ? i < 0 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "soundNotifications",
                                      n.concat([null])
                                    )
                                  : i > -1 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "soundNotifications",
                                      n.slice(0, i).concat(n.slice(i + 1))
                                    );
                              } else
                                e.$set(
                                  e.localUser.settings,
                                  "soundNotifications",
                                  s
                                );
                            },
                            function (t) {
                              return e.saveSetting("soundNotifications");
                            },
                          ],
                        },
                      }),
                      e._v(" "),
                      n("div", { staticClass: "optionCheckbox" }),
                      e._v(" "),
                      n("label", { attrs: { for: "soundNotifications" } }),
                    ]),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "option" }, [
                    n("div", { staticClass: "title" }, [
                      e._v("User events notifications"),
                    ]),
                    e._v(" "),
                    n("div", { staticClass: "optionCheckboxWrapper" }, [
                      n("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.localUser.settings.userEventsNotifications,
                            expression:
                              "localUser.settings.userEventsNotifications",
                          },
                        ],
                        attrs: {
                          type: "checkbox",
                          id: "userEventsNotifications",
                        },
                        domProps: {
                          checked: Array.isArray(
                            e.localUser.settings.userEventsNotifications
                          )
                            ? e._i(
                                e.localUser.settings.userEventsNotifications,
                                null
                              ) > -1
                            : e.localUser.settings.userEventsNotifications,
                        },
                        on: {
                          change: [
                            function (t) {
                              var n =
                                  e.localUser.settings.userEventsNotifications,
                                a = t.target,
                                s = !!a.checked;
                              if (Array.isArray(n)) {
                                var i = e._i(n, null);
                                a.checked
                                  ? i < 0 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "userEventsNotifications",
                                      n.concat([null])
                                    )
                                  : i > -1 &&
                                    e.$set(
                                      e.localUser.settings,
                                      "userEventsNotifications",
                                      n.slice(0, i).concat(n.slice(i + 1))
                                    );
                              } else
                                e.$set(
                                  e.localUser.settings,
                                  "userEventsNotifications",
                                  s
                                );
                            },
                            function (t) {
                              return e.saveSetting("userEventsNotifications");
                            },
                          ],
                        },
                      }),
                      e._v(" "),
                      n("div", { staticClass: "optionCheckbox" }),
                      e._v(" "),
                      n("label", { attrs: { for: "userEventsNotifications" } }),
                    ]),
                  ]),
                ]),
              ]
            ),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            {
              staticClass: "userItem",
              class: { ignored: e.user.ignored },
              on: {
                contextmenu: function (t) {
                  return (
                    t.preventDefault(), e.showContextMenu.apply(null, arguments)
                  );
                },
                click: function (t) {
                  return t.preventDefault(), e.onClick.apply(null, arguments);
                },
              },
            },
            [
              n("div", {
                staticClass: "flagWrapper",
                style: { backgroundImage: "url(" + e.flagSrc + ")" },
                attrs: { title: e.user.country.full_name },
              }),
              e._v(" "),
              n("div", { staticClass: "avatarWrapper" }, [
                n("img", { staticClass: "image", attrs: { src: e.avatarSrc } }),
              ]),
              e._v(" "),
              n("div", { staticClass: "nameAndGame" }, [
                n("div", { class: e.userRole, attrs: { title: e.user.name } }, [
                  e._v("\n      " + e._s(this.user.name) + "\n    "),
                ]),
                e._v(" "),
                e.user.playing
                  ? n(
                      "div",
                      {
                        staticClass: "game",
                        attrs: { title: e.user.playing.channelId },
                      },
                      [
                        e._v("\n      Playing "),
                        n("strong", [e._v(e._s(e.user.playing.channelId))]),
                      ]
                    )
                  : e._e(),
              ]),
              e._v(" "),
              n("div", { staticClass: "rankWrapper" }, [
                e.isRanked
                  ? n("img", {
                      staticClass: "rank",
                      attrs: { src: e.rankSrc, title: e.rankTitle },
                    })
                  : e._e(),
              ]),
              e._v(" "),
              n("div", { staticClass: "pingWrapper" }, [
                !e.user.isLocal || e.user.wlan
                  ? n("div", [
                      n("img", {
                        staticClass: "ping",
                        attrs: { src: e.pingSrc, title: e.pingTitle },
                      }),
                    ])
                  : e._e(),
              ]),
            ]
          );
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "channelWrapper" }, [
            n("div", { staticClass: "channelToolbar" }, [
              n("div", { staticClass: "channelInfo" }, [
                n(
                  "div",
                  { staticClass: "name title", attrs: { title: e.data.name } },
                  [e._v("#" + e._s(e.data.name))]
                ),
                e._v(" "),
                n(
                  "div",
                  { staticClass: "name", attrs: { title: "Rom name" } },
                  [e._v(e._s(e.data.gameid))]
                ),
                e._v(" "),
                e.data.ranked
                  ? n(
                      "div",
                      {
                        staticClass: "rankedWrapper",
                        attrs: { title: "Ranked channel" },
                      },
                      [
                        n(
                          "svg",
                          {
                            staticClass: "ranked",
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "36",
                              height: "36",
                              viewBox: "0 0 36 36",
                            },
                          },
                          [
                            n("path", {
                              attrs: {
                                d: "M18 4.5c7.4 0 13.5 6.1 13.5 13.5S25.4 31.5 18 31.5 4.5 25.4 4.5 18 10.6 4.5 18 4.5M18 0C8.1 0 0 8.1 0 18s8.1 18 18 18 18-8.1 18-18S27.9 0 18 0z",
                              },
                            }),
                            e._v(" "),
                            n("path", {
                              attrs: {
                                d: "M21.2 25.7l-3-5.6h-1.9v5.6h-3.6V10.1h5.6c3.3 0 6 1.2 6 4.9 0 2.3-1.1 3.8-2.8 4.5l3.5 6.3h-3.8zm-5-8.4H18c1.8 0 2.9-.8 2.9-2.3s-1-2.1-2.9-2.1h-1.8v4.4z",
                              },
                            }),
                          ]
                        ),
                      ]
                    )
                  : e._e(),
                e._v(" "),
                n("div", { staticClass: "name" }, [
                  n(
                    "a",
                    {
                      staticClass: "link",
                      attrs: { href: e.gameReplays(), target: "_blank" },
                    },
                    [e._v("REPLAYS")]
                  ),
                ]),
                e._v(" "),
                e.data.ranked
                  ? n("div", { staticClass: "name" }, [
                      n(
                        "a",
                        {
                          staticClass: "link",
                          attrs: { href: e.gameRankings(), target: "_blank" },
                        },
                        [e._v("RANKINGS")]
                      ),
                    ])
                  : e._e(),
                e._v(" "),
                n("div", { staticClass: "name" }, [
                  n(
                    "a",
                    {
                      staticClass: "link",
                      attrs: { href: e.gameEvents(), target: "_blank" },
                    },
                    [e._v("EVENTS")]
                  ),
                ]),
                e._v(" "),
                n("div", { staticClass: "name" }, [
                  n(
                    "a",
                    {
                      staticClass: "link",
                      attrs: { href: e.userProfile(), target: "_blank" },
                    },
                    [e._v("PROFILE")]
                  ),
                ]),
              ]),
              e._v(" "),
              n("div", { staticClass: "channelActions" }, [
                n(
                  "div",
                  {
                    staticClass: "button-alt testGame",
                    on: { click: e.playAlone },
                  },
                  [
                    n(
                      "svg",
                      {
                        staticClass: "icon",
                        attrs: {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 20 20",
                        },
                      },
                      [
                        n("path", {
                          attrs: {
                            d: "M14 3l3 1.3V10l-3.2 2.4-.8.6v5H7v-5l-.8-.6L3 10V4.3L6 3v5.2l1.1.6 2 1 .9.4.9-.4 2-1 1.1-.6V3m-2-3v7l-2 1-2-1V0L1 3v8l4 3v6h10v-6l4-3V3l-7-3z",
                          },
                        }),
                      ]
                    ),
                    e._v("\n        Test Game\n      "),
                  ]
                ),
                e._v(" "),
                e.data.training
                  ? n(
                      "div",
                      {
                        staticClass: "button-alt trainingGame",
                        on: { click: e.playTraining },
                      },
                      [e._v("\n        Training\n      ")]
                    )
                  : e._e(),
              ]),
            ]),
            e._v(" "),
            n(
              "div",
              { staticClass: "channelContent" },
              [
                n("chat", {
                  ref: "chat",
                  attrs: { channel: e.data, usersByName: e.usersByName },
                  on: {
                    "cancel-challenge": e.cancelChallenge,
                    "decline-challenge": e.declineChallengeEvent,
                    "accept-challenge": e.acceptChallengeEvent,
                    "ranked-challenge": e.rankedChallange,
                    "state-challenge": e.stateChallenge,
                    "decline-outer-challenge": e.declineOuterChallenge,
                    "accept-outer-challenge": e.acceptOuterChallenge,
                    "show-context-menu": e.showContextMenu,
                    "challenge-user": e.challengeUser,
                    "goto-channel-by-gameid": e.gotoChannelByGameId,
                    "goto-chat-message": e.gotoChatMessage,
                    "show-emojis-view": e.showEmojisView,
                    "play-alone": e.playAlone,
                    "play-training": e.playTraining,
                    "ignore-user": e.ignoreUser,
                    "clear-chat": e.clearChat,
                  },
                }),
                e._v(" "),
                n("users-list", {
                  ref: "usersList",
                  attrs: { channel: e.data },
                  on: {
                    "show-context-menu": e.showContextMenu,
                    "challenge-user": e.challengeUser,
                    "goto-channel-by-gameid": e.gotoChannelByGameId,
                    "ignore-user": e.ignoreUser,
                    "sorting-changed": e.onSortingChange,
                  },
                }),
              ],
              1
            ),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "login" }, [
            e._m(0),
            e._v(" "),
            n("div", { staticClass: "formWrapper" }, [
              n(
                "div",
                {
                  staticClass: "notificationWrapper",
                  class: { visible: e.showAccountCreatedMessage },
                },
                [
                  n("div", { staticClass: "notificationTitle" }, [
                    e._v("\n        New account succesfully created\n      "),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "notificationBody" }, [
                    e._v("\n        Please log in.\n      "),
                  ]),
                ]
              ),
              e._v(" "),
              n("h2", [e._v(e._s(e.formTitle()))]),
              e._v(" "),
              n(
                "form",
                {
                  ref: "loginform",
                  staticClass: "form",
                  on: { keydown: e.onFormKeyDown },
                },
                [
                  n("div", { staticClass: "title error" }, [
                    n("p", [e._v(e._s(e.errorMessages.generic))]),
                  ]),
                  e._v(" "),
                  e.errorMessages.generic
                    ? e._e()
                    : n("div", { staticClass: "input-area username" }, [
                        n(
                          "div",
                          {
                            staticClass: "title",
                            class: { error: e.errorMessages.username },
                          },
                          [
                            n("span", [e._v("Username")]),
                            e._v(" "),
                            n("span", [e._v(e._s(e.errorMessages.username))]),
                          ]
                        ),
                        e._v(" "),
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.username,
                              expression: "username",
                            },
                          ],
                          ref: "username",
                          attrs: {
                            type: "text",
                            readonly: e.working,
                            maxlength: "20",
                            autofocus: "",
                            autocorrect: "off",
                            spellcheck: "false",
                          },
                          domProps: { value: e.username },
                          on: {
                            input: function (t) {
                              t.target.composing ||
                                (e.username = t.target.value);
                            },
                          },
                        }),
                      ]),
                  e._v(" "),
                  e.errorMessages.generic
                    ? e._e()
                    : n(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !e.signIn(),
                              expression: "!signIn()",
                            },
                          ],
                          staticClass: "input-area email",
                        },
                        [
                          n(
                            "div",
                            {
                              staticClass: "title",
                              class: { error: e.errorMessages.email },
                            },
                            [
                              n("span", [e._v("E-mail")]),
                              e._v(" "),
                              n("span", [e._v(e._s(e.errorMessages.email))]),
                            ]
                          ),
                          e._v(" "),
                          n("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: e.email,
                                expression: "email",
                              },
                            ],
                            ref: "email",
                            attrs: {
                              type: "text",
                              readonly: e.working,
                              autofocus: "",
                              autocorrect: "off",
                              spellcheck: "false",
                            },
                            domProps: { value: e.email },
                            on: {
                              input: function (t) {
                                t.target.composing ||
                                  (e.email = t.target.value);
                              },
                            },
                          }),
                        ]
                      ),
                  e._v(" "),
                  e.errorMessages.generic
                    ? e._e()
                    : n("div", { staticClass: "input-area password" }, [
                        n(
                          "div",
                          {
                            staticClass: "title",
                            class: { error: e.errorMessages.password },
                          },
                          [
                            n("span", [e._v("Password")]),
                            e._v(" "),
                            n("span", [e._v(e._s(e.errorMessages.password))]),
                          ]
                        ),
                        e._v(" "),
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.password,
                              expression: "password",
                            },
                          ],
                          ref: "password",
                          attrs: {
                            type: "password",
                            name: "password",
                            readonly: e.working,
                            autocorrect: "off",
                            spellcheck: "false",
                          },
                          domProps: { value: e.password },
                          on: {
                            input: function (t) {
                              t.target.composing ||
                                (e.password = t.target.value);
                            },
                          },
                        }),
                      ]),
                  e._v(" "),
                  e.signIn()
                    ? n(
                        "a",
                        {
                          staticClass: "button-generic",
                          class: { working: e.working, spinner: e.working },
                          on: { click: e.doWork },
                        },
                        [e._v("\n        " + e._s(e.workAction()) + "\n      ")]
                      )
                    : n(
                        "g-recaptcha",
                        {
                          class: {
                            gRecaptchaButton: e.working,
                            working: e.working,
                            spinner: e.working,
                          },
                          attrs: {
                            "data-sitekey":
                              "6LcrpfcUAAAAAJQXSm03KLqEdiA-l6nGjkw6mC_G",
                            "data-validate": e.gRecaptchaValidate,
                            "data-callback": e.gRecaptchaCallback,
                            "data-btn-class": "gRecaptchaButton",
                          },
                        },
                        [e._v("\n        " + e._s(e.workAction()) + "\n      ")]
                      ),
                  e._v(" "),
                  e.errorMessages.password
                    ? n(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: e.signIn(),
                              expression: "signIn()",
                            },
                          ],
                          staticClass: "forgotPassword",
                        },
                        [
                          n(
                            "a",
                            {
                              attrs: {
                                href: "https://www.fightcade.com/resetpassword",
                                target: "_blank",
                              },
                            },
                            [e._v("Forgot your password?")]
                          ),
                        ]
                      )
                    : e._e(),
                  e._v(" "),
                  n("br"),
                  e._v(" "),
                  n("br"),
                  e._v(" "),
                  n("br"),
                  e._v(" "),
                  e._m(1),
                ],
                1
              ),
              e._v(" "),
              e.errorMessages.generic
                ? e._e()
                : n("div", { staticClass: "changeWorkAction" }, [
                    n("h3", [e._v(e._s(e.changeWorkActionText()))]),
                    e._v(" "),
                    n(
                      "a",
                      {
                        staticClass: "button-generic",
                        on: { click: e.changeWorkActionLinkClicked },
                      },
                      [e._v(e._s(e.changeWorkActionLink()))]
                    ),
                  ]),
            ]),
          ]);
        },
        staticRenderFns: [
          function () {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n("div", { staticClass: "logoWrapper" }, [
              n("img", {
                staticClass: "logo",
                attrs: { src: "/static/ui/logo_full_light.svg" },
              }),
            ]);
          },
          function () {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n("div", { staticClass: "coc" }, [
              e._v("\n        By using Fightcade you adhere to the "),
              n(
                "a",
                { attrs: { href: "https://fgcoc.com/", target: "_blank" } },
                [e._v("Fighting Game Community Code of Conduct.")]
              ),
            ]);
          },
        ],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            { staticClass: "message", class: e.data.type },
            [
              e._l(e.data.lines, function (t, a) {
                return [
                  n(
                    "div",
                    { ref: "line_" + a, refInFor: !0, staticClass: "line" },
                    [
                      n(
                        "div",
                        { staticClass: "blocksContainer" },
                        e._l(t.blocks, function (t, s) {
                          return n("div", { staticClass: "blocks" }, [
                            n("span", {
                              ref: "block_" + a + "_" + s,
                              refInFor: !0,
                              class: t.class,
                              domProps: { innerHTML: e._s(t.text) },
                            }),
                          ]);
                        }),
                        0
                      ),
                    ]
                  ),
                ];
              }),
            ],
            2
          );
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "message", class: e.data.type }, [
            n("div", { staticClass: "challengeContainer" }, [
              n("div", { staticClass: "title" }, [
                e._v("\n      " + e._s(e.message) + "\n    "),
              ]),
            ]),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            {
              staticClass: "channelPreviewWrapper",
              attrs: { title: e.channelTitle(e.channel) },
            },
            [
              n(
                "div",
                {
                  directives: [
                    {
                      name: "lazy",
                      rawName: "v-lazy:background-image",
                      value: e.lazyThumbnailBg(e.channel),
                      expression: "lazyThumbnailBg(channel)",
                      arg: "background-image",
                    },
                  ],
                  staticClass: "thumbnail",
                },
                [
                  n("div", { staticClass: "channelExtraInfoWrapper" }, [
                    n("div", { staticClass: "channelExtraInfo" }, [
                      e.channel.isFavorite
                        ? n("div", { staticClass: "favStatus" }, [
                            e._v("\n        ★\n        "),
                          ])
                        : e._e(),
                      e._v(" "),
                      n("div", { staticClass: "num-users" }, [
                        n(
                          "svg",
                          {
                            staticClass: "usersIconSvg",
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "14",
                              height: "14",
                              viewBox: "0 0 14 14",
                            },
                          },
                          [
                            n("path", {
                              attrs: {
                                d: "M7 8c2.2 0 4-1.8 4-4S9.2 0 7 0 3 1.8 3 4s1.8 4 4 4zm0-7c1.7 0 3 1.3 3 3S8.7 7 7 7 4 5.7 4 4s1.3-3 3-3zm0 8c-3.9 0-7 2.5-7 5h14c0-2.5-3.1-5-7-5zm-5.8 4c.7-1.5 3-3 5.8-3s5 1.5 5.8 3H1.2z",
                              },
                            }),
                          ]
                        ),
                        e._v(
                          "\n          " +
                            e._s(e.getNumUsers(e.channel)) +
                            "\n        "
                        ),
                      ]),
                      e._v(" "),
                      e.channel.ranked
                        ? n(
                            "div",
                            {
                              staticClass: "rankedStatus",
                              attrs: { title: "Ranked channel" },
                            },
                            [
                              n(
                                "svg",
                                {
                                  attrs: {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 36 36",
                                  },
                                },
                                [
                                  n("path", {
                                    attrs: {
                                      d: "M18 4.5c7.4 0 13.5 6.1 13.5 13.5S25.4 31.5 18 31.5 4.5 25.4 4.5 18 10.6 4.5 18 4.5M18 0C8.1 0 0 8.1 0 18s8.1 18 18 18 18-8.1 18-18S27.9 0 18 0z",
                                    },
                                  }),
                                  e._v(" "),
                                  n("path", {
                                    attrs: {
                                      d: "M21.2 25.7l-3-5.6h-1.9v5.6h-3.6V10.1h5.6c3.3 0 6 1.2 6 4.9 0 2.3-1.1 3.8-2.8 4.5l3.5 6.3h-3.8zm-5-8.4H18c1.8 0 2.9-.8 2.9-2.3s-1-2.1-2.9-2.1h-1.8v4.4z",
                                    },
                                  }),
                                ]
                              ),
                            ]
                          )
                        : e._e(),
                    ]),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "channelInfoWrapper" }, [
                    n("div", { staticClass: "name" }, [
                      e._v(e._s(e.getChannelName(e.channel.name))),
                    ]),
                    e._v(" "),
                    n("div", { staticClass: "system" }, [
                      e._v(e._s(e.channel.system)),
                    ]),
                  ]),
                ]
              ),
              e._v(" "),
              n(
                "div",
                {
                  staticClass: "channelActions",
                  class: { patreon: !e.channelIsAvaibleForUser(e.channel) },
                },
                [
                  n("div", { staticClass: "channelSubActions" }, [
                    e.canFavoriteChannel(e.channel)
                      ? n(
                          "a",
                          {
                            staticClass: "button-generic favButton",
                            on: {
                              click: function (t) {
                                return e.favChannel(e.channel);
                              },
                            },
                          },
                          [
                            e.channel.isFavorite
                              ? [e._v("\n            ☆ Unfav\n        ")]
                              : [e._v("\n            ★ Fav\n        ")],
                          ],
                          2
                        )
                      : e._e(),
                    e._v(" "),
                    e.newChannelIsAvaibleForUser(e.channel)
                      ? n(
                          "a",
                          {
                            staticClass: "button-generic favButton",
                            attrs: { title: "Create Lobby" },
                            on: {
                              click: function (t) {
                                return e.newChannel(e.channel);
                              },
                            },
                          },
                          [e._v("\n        Lobby\n      ")]
                        )
                      : e._e(),
                    e._v(" "),
                    e.delChannelIsAvaibleForUser(e.channel)
                      ? n(
                          "a",
                          {
                            staticClass: "button-generic favButton",
                            attrs: { title: "Delete Lobby" },
                            on: {
                              click: function (t) {
                                return e.delChannel(e.channel);
                              },
                            },
                          },
                          [e._v("\n        Delete\n      ")]
                        )
                      : e._e(),
                  ]),
                  e._v(" "),
                  e.channelIsAvaibleForUser(e.channel)
                    ? e._e()
                    : n("div", [
                        n("div", { staticClass: "patronExclusive" }, [
                          e._v(
                            "\n        " +
                              e._s(e.getReasonChannelNotAvailable(e.channel)) +
                              "\n      "
                          ),
                        ]),
                        e._v(" "),
                        e.userRole < 50
                          ? n(
                              "div",
                              {
                                staticClass: "button-generic",
                                attrs: { title: "" },
                                on: { click: e.openPatreonChannel },
                              },
                              [e._v("\n        Learn more\n      ")]
                            )
                          : e._e(),
                      ]),
                  e._v(" "),
                  e.channelIsAvaibleForUser(e.channel) &&
                  !e.channelIsDisabled(e.channel)
                    ? n(
                        "a",
                        {
                          staticClass: "button-generic joinButton",
                          attrs: { title: e.channelTitle(e.channel, !0) },
                          on: {
                            click: function (t) {
                              return e.joinChannel(e.channel);
                            },
                          },
                        },
                        [e._v("\n      Join\n    ")]
                      )
                    : e._e(),
                ]
              ),
              e._v(" "),
              e.channelIsHack(e.channel)
                ? n("div", { staticClass: "ribbon" }, [
                    n("span", [e._v("Hack")]),
                  ])
                : e._e(),
            ]
          );
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            { staticClass: "messageWrapper", class: e.data.type },
            [
              e._l(e.data.lines, function (t, a) {
                return [
                  n(
                    "div",
                    { ref: "line_" + a, refInFor: !0, staticClass: "line" },
                    [
                      n(
                        "div",
                        { staticClass: "blocksContainer" },
                        e._l(t.blocks, function (t, s) {
                          return n("div", { staticClass: "blocks" }, [
                            n("span", {
                              ref: "block_" + a + "_" + s,
                              refInFor: !0,
                              class: t.class,
                              domProps: { innerHTML: e._s(t.text) },
                            }),
                          ]);
                        }),
                        0
                      ),
                    ]
                  ),
                ];
              }),
            ],
            2
          );
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            {
              staticClass: "matchItem",
              on: {
                click: function (t) {
                  return t.preventDefault(), e.onClick.apply(null, arguments);
                },
                contextmenu: function (t) {
                  return (
                    t.preventDefault(), e.showContextMenu.apply(null, arguments)
                  );
                },
              },
            },
            [
              n("div", { staticClass: "matchInfo" }, [
                n("div", { staticClass: "playerInfo" }, [
                  e.isRanked(e.data.player1)
                    ? n(
                        "div",
                        {
                          staticClass: "playerRank",
                          attrs: { title: e.getRankTitle(e.data.player1) },
                        },
                        [
                          n("img", {
                            staticClass: "image",
                            attrs: { src: e.rankSrc(e.data.player1) },
                          }),
                        ]
                      )
                    : e._e(),
                  e._v(" "),
                  n("div", {
                    staticClass: "playerFlag",
                    style: {
                      backgroundImage: "url(" + e.flagSrc(e.data.player1) + ")",
                    },
                    attrs: { title: e.data.player1.country.full_name },
                  }),
                  e._v(" "),
                  n(
                    "div",
                    {
                      class: e.userRole(e.data.player1),
                      attrs: { title: e.data.player1.name },
                    },
                    [
                      e._v(
                        "\n        " + e._s(e.data.player1.name) + "\n      "
                      ),
                    ]
                  ),
                ]),
                e._v(" "),
                e.data.ranked
                  ? n("div", { staticClass: "matchVsText" }, [
                      n("strong", [e._v(e._s(e.vsText()))]),
                    ])
                  : n("div", { staticClass: "matchVsText" }, [
                      e._v("\n      " + e._s(e.vsText()) + "\n    "),
                    ]),
                e._v(" "),
                n("div", { staticClass: "playerInfo" }, [
                  e.isRanked(e.data.player2)
                    ? n(
                        "div",
                        {
                          staticClass: "playerRank",
                          attrs: { title: e.getRankTitle(e.data.player2) },
                        },
                        [
                          n("img", {
                            staticClass: "image",
                            attrs: { src: e.rankSrc(e.data.player2) },
                          }),
                        ]
                      )
                    : e._e(),
                  e._v(" "),
                  n("div", {
                    staticClass: "playerFlag",
                    style: {
                      backgroundImage: "url(" + e.flagSrc(e.data.player2) + ")",
                    },
                    attrs: { title: e.data.player2.country.full_name },
                  }),
                  e._v(" "),
                  n(
                    "div",
                    {
                      class: e.userRole(e.data.player2),
                      attrs: { title: e.data.player2.name },
                    },
                    [
                      e._v(
                        "\n        " + e._s(e.data.player2.name) + "\n      "
                      ),
                    ]
                  ),
                ]),
              ]),
              e._v(" "),
              n("div", { staticClass: "matchSpectators" }, [
                e._v("\n    " + e._s(e.data.numSpectators) + "\n  "),
              ]),
            ]
          );
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "patreonWrapper" }, [
            n("div", { staticClass: "patreonHeader" }, [
              n("div", { staticClass: "image" }, [
                n(
                  "svg",
                  {
                    attrs: {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "800",
                      height: "122",
                      viewBox: "0 0 800 122",
                    },
                  },
                  [
                    n("path", {
                      attrs: {
                        fill: "#fff",
                        d: "M785.8 114.8V7.2h7.9v107.7h-7.9v-.1zm-44-71.7h7.9v34.1h-8.2l-12.3-21.9v21.9h-7.9V43.1h8.2l12.3 22.2V43.1zm-51.7-.9c11.3 0 18 8.6 18 17.9 0 9.4-6.7 17.9-18 17.9-11.4 0-18.1-8.6-18.1-17.9 0-9.3 6.7-17.9 18.1-17.9zm10 17.9c0-5.6-3.8-10.8-10-10.8s-10 5.2-10 10.8c0 5.6 3.8 10.8 10 10.8 6.2.1 10-5.2 10-10.8zM562.5 49.9v-6.8h23.4v6.8h-7.8v27.3h-7.9V49.9h-7.7zm83.7 7.2h12.9v6.2h-12.9v7.5h12.9v6.3h-20.8v-34h20.8v6.3h-12.9v7.7zm-33.7-14c7.6 0 12.4 5.7 12.4 12.3 0 4.8-2.5 9-6.8 11l6.8 10.8h-9.2l-6-9.5H606v9.5h-7.9V43.1h14.4zm4.4 12.3c0-3.2-2.1-5.9-5.5-5.9H606v11.8h5.4c3.4 0 5.5-2.7 5.5-5.9zM547.1 73H535l-1.3 4.1h-8.4L537.5 43h7.3L557 77.2h-8.6l-1.3-4.2zM541 52.8l-4.2 14h8.3l-4.1-14zm-35.3-9.7c7.6 0 12.4 5.7 12.4 12.3s-4.9 12.3-12.4 12.3h-6.4v9.5h-7.9V43.1h14.3zm4.5 12.3c0-3.2-2.1-5.9-5.5-5.9h-5.4v11.8h5.4c3.3 0 5.5-2.7 5.5-5.9z",
                      },
                    }),
                    e._v(" "),
                    n("path", {
                      attrs: {
                        fill: "#fff",
                        d: "M421.1 38.1L400 59.3l-21.2-21.2-1.7 1.7L398.2 61l-21.1 21.2 1.7 1.7L400 62.7l21.1 21.2 1.8-1.7L401.7 61l21.2-21.2z",
                      },
                    }),
                    e._v(" "),
                    n("path", {
                      staticClass: "logoLetters",
                      attrs: {
                        d: "M244.1 81.9H231l-6.5-13.7-6.7 13.7h-13.2l19.8-41.8 19.7 41.8zM305.5 61l-5.2-9h9.5l-1.5-11.9h-29.5L290.9 61l-12.1 20.9h29.5l1.5-11.9h-9.5zM36.9 52l-1.4-11.9H6.2l6.7 11.5 2 3.5H6.2v26.8h12V67h17.9l-8.7-15zM40.6 40.1h12v41.8h-12zM121.7 40.1V55h-9V40.1h-12v41.8h12V67h9v14.9h12V40.1zM96.4 57.1H78.2l-1 8.3h7.5c-1.5 2.7-4.4 4.6-7.8 4.6-4.9 0-9-4-9-9s4-9.2 9-9.2c2.7 0 5.1 1.5 6.8 3.4l5.8-10c-2.4-2.9-6.9-4.9-11.4-5.1-11.5-.4-22 9.3-22 20.9S65.5 81.9 77 81.9 97 72.5 97 61c-.1-1.4-.3-2.7-.6-3.9zM169.4 40.1h-31V52h8.3v29.9h12V52h9.3zM197.5 66.3c-1.6 2.2-4.3 3.7-7.2 3.7-4.9 0-9-4-9-9s4-9 9-9c3 0 5.6 1.5 7.2 3.7l6.2-10.8c-3.6-3-8.3-4.9-13.4-4.9-11.6 0-20.9 9.4-20.9 20.9s9.4 20.9 20.9 20.9c5.1 0 9.8-1.8 13.4-4.9l-6.2-10.6z",
                      },
                    }),
                    e._v(" "),
                    n("path", {
                      staticClass: "logoLetters",
                      attrs: {
                        d: "M261 40.1h-14v41.8h14c11.6 0 20.9-9.4 20.9-20.9.1-11.6-9.3-20.9-20.9-20.9zm0 29.9h-2V52h2c4.9 0 9 4 9 9s-4 9-9 9z",
                      },
                    }),
                  ]
                ),
              ]),
              e._v(" "),
              n("h2", [e._v("\n      Help us make a better Fightcade\n    ")]),
            ]),
            e._v(" "),
            e._m(0),
          ]);
        },
        staticRenderFns: [
          function () {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n("div", { staticClass: "patreonContentWrapper" }, [
              n("div", { staticClass: "patreonContent" }, [
                n("div", { staticClass: "patreonTexts" }, [
                  n("div", { staticClass: "whyPatreon" }, [
                    n("h3", [e._v("\n            Why Patreon?\n          ")]),
                    e._v(" "),
                    n("p", [
                      n("strong", [
                        e._v("Developing Fightcade is not our daily work."),
                      ]),
                      e._v(
                        " We're doing it in our spare time out of our passion for retro games. It never gave us any money, but it actually costs quite a bit to keep the servers up and running.\n          "
                      ),
                    ]),
                    e._v(" "),
                    n("p", [
                      e._v(
                        "\n            Opening a Patreon means we can cover those expenses, and reaching a certain point in funding we can also continue allocating time to develop some new features.\n          "
                      ),
                    ]),
                    e._v(" "),
                    n("p", [
                      n("strong", [
                        e._v(
                          "Fightcade will continue to be free for everyone, forever."
                        ),
                      ]),
                      e._v(
                        " We're just introducing extra frontend and cosmetic features for our patrons.\n          "
                      ),
                    ]),
                  ]),
                  e._v(" "),
                  n("div", { staticClass: "patreonPerks" }, [
                    n("h3", [
                      e._v(
                        "\n            What do I get as a patron?\n          "
                      ),
                    ]),
                    e._v(" "),
                    n("ul", [
                      n("li", [
                        e._v(
                          "\n              Customize your UI: unlock all custom color themes.\n            "
                        ),
                      ]),
                      e._v(" "),
                      n("li", [
                        e._v(
                          "\n              Join up to 12 concurrent channels.\n            "
                        ),
                      ]),
                      e._v(" "),
                      n("li", [
                        e._v(
                          "\n              See your ELO score in ranked game channels after every match.\n            "
                        ),
                      ]),
                      e._v(" "),
                      n("li", [
                        e._v("\n              Create your own "),
                        n("strong", [
                          n(
                            "a",
                            {
                              attrs: {
                                href: "https://www.patreon.com/posts/39810324",
                                target: "_blank",
                              },
                            },
                            [e._v("Private Lobbies")]
                          ),
                        ]),
                        e._v(".\n            "),
                      ]),
                      e._v(" "),
                      n("li", [
                        e._v(
                          "\n              Disable live spectators to your matches.\n            "
                        ),
                      ]),
                      e._v(" "),
                      n("li", [
                        n("strong", [e._v("Goldie")]),
                        e._v(" name in the Fightcade chat.\n            "),
                      ]),
                      e._v(" "),
                      n("li", [
                        e._v(
                          "\n              Get an exclusive role in our official Discord server to show off your support.\n            "
                        ),
                      ]),
                    ]),
                    e._v(" "),
                    n("p", [
                      e._v(
                        "\n            The features available to you depend on the tier you opted in. "
                      ),
                      n("strong", [
                        n(
                          "a",
                          {
                            attrs: {
                              href: "https://www.patreon.com/Fightcade",
                              target: "_blank",
                            },
                          },
                          [e._v("More info on our Patreon page")]
                        ),
                      ]),
                      e._v(".\n          "),
                    ]),
                  ]),
                ]),
                e._v(" "),
                n("div", { staticClass: "becomePatron" }, [
                  n("h3", [e._v("\n          Sounds good?\n        ")]),
                  e._v(" "),
                  n(
                    "a",
                    {
                      attrs: {
                        href: "https://www.patreon.com/Fightcade",
                        target: "_blank",
                      },
                    },
                    [
                      n("div", { staticClass: "button-generic" }, [
                        e._v("\n            Become a patron\n          "),
                      ]),
                    ]
                  ),
                ]),
              ]),
            ]);
          },
        ],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "searchWrapper" }, [
            n(
              "div",
              { staticClass: "contentWrapper" },
              [
                n("header", [
                  e.canFilter()
                    ? n("div", { staticClass: "inputWrapper" }, [
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.textFilter,
                              expression: "textFilter",
                            },
                          ],
                          ref: "textFilter",
                          staticClass: "text-filter",
                          attrs: {
                            type: "text",
                            autocorrect: "off",
                            spellcheck: "false",
                            placeholder: e.getPlaceholder(),
                          },
                          domProps: { value: e.textFilter },
                          on: {
                            input: function (t) {
                              t.target.composing ||
                                (e.textFilter = t.target.value);
                            },
                          },
                        }),
                        e._v(" "),
                        n(
                          "div",
                          {
                            staticClass: "filtersButton",
                            class: { active: e.openedFilters },
                            on: { click: e.toggleFilters },
                          },
                          [
                            n(
                              "svg",
                              {
                                staticClass: "filtersButtonIcon",
                                attrs: {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  width: "40",
                                  height: "40",
                                  viewBox: "0 0 40 40",
                                },
                              },
                              [
                                n("path", {
                                  attrs: {
                                    d: "M9 0h2v10H9zM9 21h2v19H9zM19 0h2v21h-2zM19 32h2v8h-2zM29 0h2v14h-2zM29 25h2v15h-2z",
                                  },
                                }),
                                e._v(" "),
                                n("path", {
                                  attrs: {
                                    d: "M11 11v9H9v-9h2m2-2H7v13h6V9zM21 22v9h-2v-9h2m2-2h-6v13h6V20zM31 15v9h-2v-9h2m2-2h-6v13h6V13z",
                                  },
                                }),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : e._e(),
                  e._v(" "),
                  e.canFilter()
                    ? n(
                        "div",
                        {
                          staticClass: "filtersWrapper",
                          class: { active: e.openedFilters },
                        },
                        [
                          n("div", { staticClass: "filtersList" }, [
                            n("div", { staticClass: "filterItem genre" }, [
                              n("div", { staticClass: "title" }, [
                                e._v("Genre"),
                              ]),
                              e._v(" "),
                              n(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: e.genreFilter,
                                      expression: "genreFilter",
                                    },
                                  ],
                                  staticClass: "selectValue",
                                  on: {
                                    change: [
                                      function (t) {
                                        var n = Array.prototype.filter
                                          .call(t.target.options, function (e) {
                                            return e.selected;
                                          })
                                          .map(function (e) {
                                            return "_value" in e
                                              ? e._value
                                              : e.value;
                                          });
                                        e.genreFilter = t.target.multiple
                                          ? n
                                          : n[0];
                                      },
                                      function (t) {
                                        return e.requestChannels(0);
                                      },
                                    ],
                                  },
                                },
                                e._l(e.genres, function (t, a) {
                                  return n(
                                    "option",
                                    { domProps: { value: a } },
                                    [
                                      e._v(
                                        "\n                " +
                                          e._s(t) +
                                          "\n              "
                                      ),
                                    ]
                                  );
                                }),
                                0
                              ),
                            ]),
                            e._v(" "),
                            n("div", { staticClass: "filterItem year" }, [
                              n("div", { staticClass: "title" }, [
                                e._v("Release year"),
                              ]),
                              e._v(" "),
                              n(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: e.yearFilter,
                                      expression: "yearFilter",
                                    },
                                  ],
                                  staticClass: "selectValue",
                                  on: {
                                    change: [
                                      function (t) {
                                        var n = Array.prototype.filter
                                          .call(t.target.options, function (e) {
                                            return e.selected;
                                          })
                                          .map(function (e) {
                                            return "_value" in e
                                              ? e._value
                                              : e.value;
                                          });
                                        e.yearFilter = t.target.multiple
                                          ? n
                                          : n[0];
                                      },
                                      function (t) {
                                        return e.requestChannels(0);
                                      },
                                    ],
                                  },
                                },
                                e._l(e.years, function (t, a) {
                                  return n(
                                    "option",
                                    { domProps: { value: a } },
                                    [
                                      e._v(
                                        "\n                " +
                                          e._s(t) +
                                          "\n              "
                                      ),
                                    ]
                                  );
                                }),
                                0
                              ),
                            ]),
                            e._v(" "),
                            n("div", { staticClass: "filterItem system" }, [
                              n("div", { staticClass: "title" }, [
                                e._v("System"),
                              ]),
                              e._v(" "),
                              n(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: e.systemFilter,
                                      expression: "systemFilter",
                                    },
                                  ],
                                  staticClass: "selectValue",
                                  on: {
                                    change: [
                                      function (t) {
                                        var n = Array.prototype.filter
                                          .call(t.target.options, function (e) {
                                            return e.selected;
                                          })
                                          .map(function (e) {
                                            return "_value" in e
                                              ? e._value
                                              : e.value;
                                          });
                                        e.systemFilter = t.target.multiple
                                          ? n
                                          : n[0];
                                      },
                                      function (t) {
                                        return e.requestChannels(0);
                                      },
                                    ],
                                  },
                                },
                                e._l(e.systems, function (t, a) {
                                  return n(
                                    "option",
                                    { domProps: { value: a } },
                                    [
                                      e._v(
                                        "\n                " +
                                          e._s(t) +
                                          "\n              "
                                      ),
                                    ]
                                  );
                                }),
                                0
                              ),
                            ]),
                            e._v(" "),
                            n("div", { staticClass: "filterItem ranked" }, [
                              n("div", { staticClass: "title" }, [
                                e._v("Ranked"),
                              ]),
                              e._v(" "),
                              n(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: e.rankedFilter,
                                      expression: "rankedFilter",
                                    },
                                  ],
                                  staticClass: "selectValue",
                                  on: {
                                    change: [
                                      function (t) {
                                        var n = Array.prototype.filter
                                          .call(t.target.options, function (e) {
                                            return e.selected;
                                          })
                                          .map(function (e) {
                                            return "_value" in e
                                              ? e._value
                                              : e.value;
                                          });
                                        e.rankedFilter = t.target.multiple
                                          ? n
                                          : n[0];
                                      },
                                      function (t) {
                                        return e.requestChannels(0);
                                      },
                                    ],
                                  },
                                },
                                e._l(e.rankedOptions, function (t, a) {
                                  return n(
                                    "option",
                                    { domProps: { value: a } },
                                    [
                                      e._v(
                                        "\n                " +
                                          e._s(t) +
                                          "\n              "
                                      ),
                                    ]
                                  );
                                }),
                                0
                              ),
                            ]),
                          ]),
                          e._v(" "),
                          n(
                            "div",
                            {
                              staticClass: "button-alt",
                              on: { click: e.clearFilters },
                            },
                            [e._v("\n          Clear filters\n        ")]
                          ),
                        ]
                      )
                    : e._e(),
                ]),
                e._v(" "),
                n("paginated-list", {
                  ref: "paginatedList",
                  attrs: {
                    noItemsInfo: e.noItemsInfo,
                    hideFooter: !e.canFilter(),
                  },
                  on: {
                    "join-channel": e.joinChannel,
                    "new-channel": e.newChannel,
                    "del-channel": e.delChannel,
                    "fav-channel": e.favChannel,
                    "select-channel": e.selectChannel,
                    "goto-page-offset": e.gotoPageOffset,
                  },
                }),
              ],
              1
            ),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "message", class: e.data.type }, [
            n("div", { staticClass: "challengeContainer" }, [
              "active" === e.data.state && e.data.ranked
                ? n("div", { staticClass: "title" }, [
                    n("strong", [e._v("Ranked Match")]),
                    e._v(
                      " You have challenged " +
                        e._s(e.data.opponent.name) +
                        " to a "
                    ),
                    n("strong", [e._v("FT" + e._s(e.data.ranked))]),
                    e._v("!\n    "),
                  ])
                : n("div", { staticClass: "title" }, [
                    n(
                      "span",
                      { staticClass: "wrapUpWrapper", class: e.data.state },
                      [e._v("\n        " + e._s(e.message) + "\n      ")]
                    ),
                  ]),
              e._v(" "),
              "challenging" === e.data.state
                ? n("div", { staticClass: "rank-options" }, [
                    n(
                      "span",
                      {
                        staticClass: "rank-option",
                        on: {
                          click: function (t) {
                            return e.challenge(2);
                          },
                        },
                      },
                      [e._v("FT2")]
                    ),
                    e._v(" "),
                    n(
                      "span",
                      {
                        staticClass: "rank-option",
                        on: {
                          click: function (t) {
                            return e.challenge(3);
                          },
                        },
                      },
                      [e._v("FT3")]
                    ),
                    e._v(" "),
                    n(
                      "span",
                      {
                        staticClass: "rank-option",
                        on: {
                          click: function (t) {
                            return e.challenge(5);
                          },
                        },
                      },
                      [e._v("FT5")]
                    ),
                    e._v(" "),
                    n(
                      "span",
                      {
                        staticClass: "rank-option",
                        on: {
                          click: function (t) {
                            return e.challenge(10);
                          },
                        },
                      },
                      [e._v("FT10")]
                    ),
                    e._v(" "),
                    n(
                      "span",
                      {
                        staticClass: "rank-option",
                        on: {
                          click: function (t) {
                            return e.challenge(20);
                          },
                        },
                      },
                      [e._v("FT20")]
                    ),
                    e._v(" "),
                    n(
                      "span",
                      {
                        staticClass: "rank-option",
                        on: {
                          click: function (t) {
                            return e.challenge(0);
                          },
                        },
                      },
                      [e._v("Unranked")]
                    ),
                    e._v(" "),
                    n(
                      "span",
                      {
                        staticClass: "rank-option cancel",
                        on: {
                          click: function (t) {
                            return e.onChallengeChangesState("cancelled");
                          },
                        },
                      },
                      [e._v("Cancel")]
                    ),
                  ])
                : e._e(),
              e._v(" "),
              "active" === e.data.state
                ? n(
                    "div",
                    {
                      staticClass: "cancel-challenge",
                      on: { click: e.cancelChallenge },
                    },
                    [e._v("Cancel")]
                  )
                : e._e(),
            ]),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            { staticClass: "message", class: e.data.type },
            [
              e._l(e.data.lines, function (t, a) {
                return [
                  0 === a
                    ? n("header", [
                        n("div", { staticClass: "avatarWrapper" }, [
                          n("img", {
                            ref: "avatar",
                            refInFor: !0,
                            staticClass: "avatar",
                            attrs: { src: e.avatarSrc },
                            on: {
                              click: function (t) {
                                return e.onAvatarClick();
                              },
                            },
                          }),
                        ]),
                        e._v(" "),
                        n("div", { staticClass: "authorAndTime" }, [
                          n(
                            "span",
                            {
                              ref: "author",
                              refInFor: !0,
                              class: e.userRole(e.data.author),
                              on: {
                                contextmenu: function (t) {
                                  return (
                                    t.preventDefault(),
                                    function (t) {
                                      e.showContextMenu(t, e.data.author);
                                    }.apply(null, arguments)
                                  );
                                },
                              },
                            },
                            [
                              e._v(
                                "\n          " +
                                  e._s(e.data.author.name) +
                                  "\n        "
                              ),
                            ]
                          ),
                          e._v(" "),
                          n("span", { staticClass: "time" }, [
                            e._v(
                              "at " + e._s(e.timeInfo(e.data.lines[0].time))
                            ),
                          ]),
                          e._v(" "),
                          e.canReport()
                            ? n(
                                "span",
                                {
                                  staticClass: "report",
                                  on: {
                                    click: function (t) {
                                      return e.onReport();
                                    },
                                  },
                                },
                                [e._v("\n          Report\n        ")]
                              )
                            : e._e(),
                          e._v(" "),
                          e.canConfirmReport()
                            ? n(
                                "span",
                                {
                                  staticClass: "report",
                                  on: {
                                    click: function (t) {
                                      return e.onConfirmReport();
                                    },
                                  },
                                },
                                [e._v("\n          Confirm report?\n        ")]
                              )
                            : e._e(),
                          e._v(" "),
                          e.reported
                            ? n("span", { staticClass: "reported" }, [
                                e._v("\n          Reported\n        "),
                              ])
                            : e._e(),
                          e._v(" "),
                          e.isSpam
                            ? n("span", { staticClass: "reported" }, [
                                e._v("\n          Stop spamming\n        "),
                              ])
                            : e._e(),
                        ]),
                      ])
                    : e._e(),
                  e._v(" "),
                  e.reported
                    ? e._e()
                    : n(
                        "div",
                        { ref: "line_" + a, refInFor: !0, staticClass: "line" },
                        [
                          0 !== a
                            ? n("div", { staticClass: "time" }, [
                                e._v(e._s(e.timeInfo(t.time))),
                              ])
                            : n("div", { staticClass: "time" }),
                          e._v(" "),
                          n(
                            "div",
                            { staticClass: "blocksContainer" },
                            e._l(t.blocks, function (t, s) {
                              return e.reported
                                ? e._e()
                                : n("div", { staticClass: "blocks" }, [
                                    n("span", {
                                      ref: "block_" + a + "_" + s,
                                      refInFor: !0,
                                      class: e.blockClass(t),
                                      attrs: { title: e.blockTitle(t) },
                                      domProps: { innerHTML: e._s(t.text) },
                                      on: {
                                        click: function (n) {
                                          return e.onLineBlockClick(t, a, s);
                                        },
                                      },
                                    }),
                                  ]);
                            }),
                            0
                          ),
                        ]
                      ),
                ];
              }),
            ],
            2
          );
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            { staticClass: "mainToolbarWrapper" },
            [
              n("div", { staticClass: "mainToolbar" }, [
                n("div", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: e.showGlobalStateMenu,
                      expression: "showGlobalStateMenu",
                    },
                  ],
                  staticClass: "notificationsMaskBg",
                  on: {
                    click: function (t) {
                      t.stopPropagation(), (e.showGlobalStateMenu = !1);
                    },
                  },
                }),
                e._v(" "),
                n("div", { staticClass: "logo" }, [
                  n(
                    "svg",
                    {
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "320",
                        height: "320",
                        viewBox: "0 0 320 320",
                      },
                      on: {
                        click: function (t) {
                          return e.selectChannel("about-channel");
                        },
                      },
                    },
                    [
                      n("g", { attrs: { opacity: ".5", fill: "#FFF" } }, [
                        n("path", {
                          attrs: {
                            d: "M114.3 107.5L90.4 83.6l-6.8 6.8 23.9 23.9c2.1-2.4 4.4-4.6 6.8-6.8zM90.4 160c0-1.6.1-3.2.2-4.8H56.8v9.6h33.8c-.1-1.6-.2-3.2-.2-4.8zM160 90.4c1.6 0 3.2.1 4.8.2V56.8h-9.6v33.8c1.6-.1 3.2-.2 4.8-.2zM212.5 114.3l23.9-23.9-6.8-6.8-23.9 23.9c2.4 2.1 4.7 4.4 6.8 6.8zM205.7 212.5l23.9 23.9 6.8-6.8-23.9-23.9c-2.1 2.4-4.4 4.7-6.8 6.8zM229.4 155.2c.1 1.6.2 3.2.2 4.8s-.1 3.2-.2 4.8h33.8v-9.6h-33.8zM160 229.6c-1.6 0-3.2-.1-4.8-.2v33.8h9.6v-33.8c-1.6.1-3.2.2-4.8.2zM107.5 205.7l-23.9 23.9 6.8 6.8 23.9-23.9c-2.4-2.2-4.7-4.4-6.8-6.8z",
                          },
                        }),
                      ]),
                      e._v(" "),
                      n("path", {
                        staticClass: "logoCircle",
                        attrs: {
                          d: "M160 90.4c-38.4 0-69.6 31.1-69.6 69.6s31.1 69.6 69.6 69.6 69.6-31.1 69.6-69.6-31.2-69.6-69.6-69.6zm0 105.2c-19.6 0-35.6-15.9-35.6-35.6s15.9-35.6 35.6-35.6 35.6 15.9 35.6 35.6-16 35.6-35.6 35.6z",
                        },
                      }),
                      e._v(" "),
                      n("g", { attrs: { fill: "#FFF" } }, [
                        n("path", {
                          attrs: {
                            d: "M80.8 56.5v24.3H56.5V56.5h24.3m9.6-9.6H46.9v43.6h43.6V46.9h-.1zM80.8 239.2v24.3H56.5v-24.3h24.3m9.6-9.6H46.9v43.6h43.6v-43.6h-.1zM263.5 56.5v24.3h-24.3V56.5h24.3m9.6-9.6h-43.6v43.6h43.6V46.9zM263.5 239.2v24.3h-24.3v-24.3h24.3m9.6-9.6h-43.6v43.6h43.6v-43.6zM160 13.6l17.2 17.2L160 48l-17.2-17.2L160 13.6M160 0l-30.8 30.8L160 61.6l30.8-30.8L160 0zM30.8 142.8L48 160l-17.2 17.2L13.6 160l17.2-17.2m0-13.6L0 160l30.8 30.8L61.6 160l-30.8-30.8zM289.2 142.8l17.2 17.2-17.2 17.2L272 160l17.2-17.2m0-13.6L258.4 160l30.8 30.8L320 160l-30.8-30.8zM160 272l17.2 17.2-17.2 17.2-17.2-17.2L160 272m0-13.6l-30.8 30.8L160 320l30.8-30.8-30.8-30.8z",
                          },
                        }),
                      ]),
                    ]
                  ),
                ]),
                e._v(" "),
                n(
                  "div",
                  { staticClass: "channelsList" },
                  [
                    e._l(e.channels, function (t) {
                      return [
                        e.global.isGameChannel(t.id)
                          ? n("channel-item", {
                              key: t.id,
                              attrs: { data: t },
                              on: {
                                "select-channel": e.selectChannel,
                                "leave-channel": e.leaveChannel,
                                "show-context-menu": e.showChannelContextMenu,
                                "channel-item-initialized":
                                  e.channelItemInitialized,
                              },
                            })
                          : e._e(),
                      ];
                    }),
                    e._v(" "),
                    e._l(e.channels, function (t) {
                      return [
                        "welcome-channel" === t.id
                          ? n("button-item", {
                              attrs: { data: t },
                              on: {
                                select: function (t) {
                                  return e.selectChannel("welcome-channel");
                                },
                                "channel-item-initialized":
                                  e.channelItemInitialized,
                              },
                            })
                          : e._e(),
                      ];
                    }),
                  ],
                  2
                ),
                e._v(" "),
                n("div", { staticClass: "buttonBar" }, [
                  n(
                    "a",
                    {
                      staticClass: "notificationsButton",
                      class: { active: e.showNotifications },
                      on: {
                        click: function (t) {
                          t.stopPropagation(),
                            (e.showNotifications = !e.showNotifications),
                            (e.showSettings = !1),
                            (e.showNotificationsIndicator = !1);
                        },
                      },
                    },
                    [
                      n(
                        "svg",
                        {
                          staticClass: "notificationsIconSvg",
                          attrs: {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "30",
                            height: "30",
                            viewBox: "0 0 30 30",
                          },
                        },
                        [
                          n("path", {
                            attrs: {
                              d: "M30 23h-3v-6c0-5.3-3.5-9.9-8.3-11.4.2-.5.3-1 .3-1.6 0-2.2-1.8-4-4-4s-4 1.8-4 4c0 .6.1 1.1.3 1.6C6.5 7.1 3 11.7 3 17v6H0v2h9.1c.5 2.8 2.9 5 5.9 5s5.4-2.2 5.9-5H30v-2zM15 2c1.1 0 2 .9 2 2 0 .4-.1.8-.3 1.1-.6 0-1.1-.1-1.7-.1-.6 0-1.1.1-1.7.1-.2-.3-.3-.7-.3-1.1 0-1.1.9-2 2-2zM5 17C5 11.5 9.5 7 15 7s10 4.5 10 10v6H5v-6zm10 11c-1.9 0-3.4-1.3-3.9-3h7.7c-.4 1.7-1.9 3-3.8 3z",
                            },
                          }),
                        ]
                      ),
                      e._v(" "),
                      n("div", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: e.showNotificationsIndicator,
                            expression: "showNotificationsIndicator",
                          },
                        ],
                        staticClass: "notificationsIndicator",
                      }),
                    ]
                  ),
                  e._v(" "),
                  n(
                    "a",
                    {
                      staticClass: "settingsButton",
                      class: { active: e.showSettings },
                      on: {
                        click: function (t) {
                          t.stopPropagation(),
                            (e.showSettings = !e.showSettings),
                            (e.showNotifications = !1);
                        },
                      },
                    },
                    [
                      n(
                        "svg",
                        {
                          staticClass: "settingsIconSvg",
                          attrs: {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "30",
                            height: "30",
                            viewBox: "0 0 30 30",
                          },
                        },
                        [
                          n("path", {
                            attrs: {
                              d: "M16.2 2l.6 2.6.2 1 1 .4c.4.1.7.3 1.1.4l1 .5.9-.6L23.3 5 25 6.7l-1.4 2.2-.6.9.5 1c.2.3.3.7.4 1.1l.4 1 1.1.2 2.6.6v2.4l-2.6.6-1 .3-.4 1c-.1.4-.3.7-.4 1.1l-.5 1 .6.9 1.4 2.2-1.8 1.8-2.2-1.4-.9-.6-1 .5c-.3.2-.7.3-1.1.4l-1 .4-.2 1.1-.7 2.6h-2.4l-.6-2.6-.2-1-1-.4c-.4-.1-.7-.3-1.1-.4l-1-.5-.9.6L6.7 25 5 23.3l1.4-2.2.6-.9-.5-1c-.2-.3-.3-.7-.4-1.1l-.4-1-1.1-.2-2.6-.7v-2.4l2.6-.6 1-.2.4-1c.1-.4.3-.7.4-1.1l.5-1-.5-1L5 6.7 6.7 5l2.2 1.4.9.6 1-.5c.3-.2.7-.3 1.1-.4l1-.4.2-1.1.7-2.6h2.4m1.6-2h-5.6l-.9 4.1c-.5.2-.9.3-1.3.5L6.4 2.4l-4 4L4.6 10c-.2.4-.4.9-.5 1.3l-4.1.9v5.6l4.1.9c.2.5.3.9.5 1.3l-2.2 3.6 3.9 3.9 3.6-2.2c.4.2.9.4 1.3.5l.9 4.1h5.6l.9-4.1c.5-.2.9-.3 1.3-.5l3.6 2.2 3.9-3.9-2.2-3.6c.2-.4.4-.9.5-1.3l4.1-.9v-5.6l-4.1-.9c-.2-.5-.3-.9-.5-1.3l2.2-3.6-3.9-3.9-3.6 2.2c-.4-.2-.9-.4-1.3-.5L17.8 0z",
                            },
                          }),
                          e._v(" "),
                          n("path", {
                            attrs: {
                              d: "M15 11c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4m0-2c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z",
                            },
                          }),
                        ]
                      ),
                    ]
                  ),
                  e._v(" "),
                  n("a", { ref: "user", staticClass: "userButton" }, [
                    n(
                      "div",
                      {
                        staticClass: "userAvatarWrapper",
                        on: {
                          click: function (t) {
                            t.stopPropagation(),
                              (e.showGlobalStateMenu = !e.showGlobalStateMenu);
                          },
                        },
                      },
                      [
                        n("img", {
                          staticClass: "userAvatar",
                          attrs: { src: e.avatarSrc },
                        }),
                        e._v(" "),
                        n("div", {
                          staticClass: "userState",
                          class: {
                            away: e.localUser.away,
                            playing: e.localUser.playing,
                          },
                        }),
                      ]
                    ),
                    e._v(" "),
                    n(
                      "div",
                      {
                        staticClass: "userStateMenu",
                        class: { active: e.showGlobalStateMenu },
                        on: {
                          click: function (e) {
                            e.stopPropagation();
                          },
                        },
                      },
                      [
                        n(
                          "div",
                          {
                            staticClass: "optionWrapper",
                            class: { active: !e.localUser.away },
                            on: {
                              click: function (t) {
                                return e.setAwayState(!1);
                              },
                            },
                          },
                          [
                            n("div", { staticClass: "stateShape online" }),
                            e._v(" "),
                            n("div", { staticClass: "stateName" }, [
                              e._v("Online"),
                            ]),
                          ]
                        ),
                        e._v(" "),
                        n(
                          "div",
                          {
                            staticClass: "optionWrapper",
                            class: { active: e.localUser.away },
                            on: {
                              click: function (t) {
                                return e.setAwayState(!0);
                              },
                            },
                          },
                          [
                            n("div", { staticClass: "stateShape away" }),
                            e._v(" "),
                            n("div", { staticClass: "stateName" }, [
                              e._v("Away"),
                            ]),
                          ]
                        ),
                        e._v(" "),
                        n("div", { staticClass: "logOutWrapper" }, [
                          n(
                            "div",
                            {
                              staticClass: "button",
                              on: {
                                click: function (t) {
                                  return e.logOut();
                                },
                              },
                            },
                            [e._v("\n              Log out\n            ")]
                          ),
                        ]),
                      ]
                    ),
                  ]),
                ]),
              ]),
              e._v(" "),
              n("settings", {
                class: { active: e.showSettings },
                on: {
                  close: function (t) {
                    e.showSettings = !1;
                  },
                  "select-channel": e.selectChannel,
                },
              }),
              e._v(" "),
              n("notifications", {
                ref: "notifications",
                class: { active: e.showNotifications },
                on: {
                  close: function (t) {
                    e.showNotifications = !1;
                  },
                  "decline-challenge": e.declineChallenge,
                  "accept-challenge": e.acceptChallenge,
                  "goto-chat-message": e.gotoChatMessage,
                },
              }),
            ],
            1
          );
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            { staticClass: "messageWrapper", class: e.data.type },
            [
              e._l(e.data.lines, function (t, a) {
                return [
                  n(
                    "div",
                    { ref: "line_" + a, refInFor: !0, staticClass: "line" },
                    [n("span", [e._v(e._s(t))])]
                  ),
                ];
              }),
            ],
            2
          );
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            { staticClass: "message", class: e.data.type },
            [
              e._l(e.data.lines, function (t, a) {
                return [
                  0 === a && "motd" !== e.data.author.name
                    ? n("header", [
                        n("div", { staticClass: "authorAndTime" }, [
                          n(
                            "span",
                            {
                              ref: "author",
                              refInFor: !0,
                              staticClass: "author",
                            },
                            [
                              e._v(
                                "\n          " +
                                  e._s(e.data.author.name) +
                                  "\n        "
                              ),
                            ]
                          ),
                          e._v(" "),
                          n("span", { staticClass: "time" }, [
                            e._v(
                              "at " + e._s(e.timeInfo(e.data.lines[0].time))
                            ),
                          ]),
                        ]),
                      ])
                    : e._e(),
                  e._v(" "),
                  n(
                    "div",
                    { ref: "line_" + a, refInFor: !0, staticClass: "line" },
                    [
                      n(
                        "div",
                        { staticClass: "blocksContainer" },
                        e._l(t.blocks, function (t, s) {
                          return n("div", { staticClass: "blocks" }, [
                            n("span", {
                              ref: "block_" + a + "_" + s,
                              refInFor: !0,
                              class: t.class,
                              domProps: { innerHTML: e._s(t.text) },
                              on: {
                                click: function (n) {
                                  return e.onLineBlockClick(t);
                                },
                              },
                            }),
                          ]);
                        }),
                        0
                      ),
                    ]
                  ),
                ];
              }),
            ],
            2
          );
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "welcomeListWrapper" }, [
            n("div", { staticClass: "titleWrapper" }, [
              e.title ? n("h3", [e._v(e._s(e.title))]) : e._e(),
            ]),
            e._v(" "),
            e.channels && e.channels.length > 0
              ? n(
                  "div",
                  { class: e.welcomeListGrid(e.channels) },
                  e._l(e.channels, function (t) {
                    return n(
                      "div",
                      { staticClass: "gridWrapper" },
                      [
                        n("channel-preview", {
                          attrs: { channel: t },
                          on: {
                            "join-channel": e.joinChannel,
                            "new-channel": e.newChannel,
                            "del-channel": e.delChannel,
                            "fav-channel": e.favChannel,
                            "select-channel": e.selectChannel,
                          },
                        }),
                      ],
                      1
                    );
                  }),
                  0
                )
              : e._e(),
            e._v(" "),
            e.categories && e.categories.length > 3
              ? n(
                  "div",
                  { class: e.welcomeListGrid(e.categories) },
                  e._l(e.categories, function (t) {
                    return n(
                      "div",
                      { staticClass: "gridWrapper" },
                      [
                        n("category-preview", {
                          attrs: { category: t },
                          on: {
                            "join-channel": e.joinChannel,
                            "select-channel": e.selectChannel,
                          },
                        }),
                      ],
                      1
                    );
                  }),
                  0
                )
              : e._e(),
            e._v(" "),
            e.events
              ? n(
                  "div",
                  { class: e.welcomeListGrid(e.events) },
                  e._l(e.events, function (t) {
                    return n(
                      "div",
                      { staticClass: "gridWrapper" },
                      [
                        n("event-preview", {
                          attrs: { event: t },
                          on: {
                            "join-channel": e.joinChannel,
                            "select-channel": e.selectChannel,
                          },
                        }),
                      ],
                      1
                    );
                  }),
                  0
                )
              : e._e(),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "endgameMessageWrapper" }, [
            e.isRanked
              ? n("div", [
                  n("h3", [
                    n("strong", [e._v("Ranked match")]),
                    e._v(
                      " result - " +
                        e._s(e.player1Name) +
                        " " +
                        e._s(e.data.endgame.scores[0]) +
                        " "
                    ),
                    n("strong", [e._v("FT" + e._s(e.data.endgame.ranked))]),
                    e._v(
                      " " +
                        e._s(e.data.endgame.scores[1]) +
                        " " +
                        e._s(e.player2Name) +
                        "\n    "
                    ),
                  ]),
                  e._v(" "),
                  e.isRagequit
                    ? n("div", [
                        n("p", [
                          e._v(
                            "⛔ Not finishing ranked sets might impact your rank negatively ⛔"
                          ),
                        ]),
                      ])
                    : e._e(),
                  e._v(" "),
                  e.showElo
                    ? n("div", [
                        e.outcomeMsg
                          ? n("div", [
                              n("p", [
                                e._v("\n          Your elo score is "),
                                n("span", { staticClass: "highlight" }, [
                                  e._v(e._s(e.data.endgame.finalElo)),
                                ]),
                              ]),
                              e._v(" "),
                              n(
                                "p",
                                {
                                  staticClass: "wrapUpWrapper",
                                  class: e.outcomeMsg,
                                },
                                [
                                  e._v(
                                    "\n          You " +
                                      e._s(e.outcomeMsg) +
                                      " " +
                                      e._s(
                                        Math.abs(
                                          e.data.endgame.finalElo -
                                            e.data.endgame.initialElo
                                        )
                                      ) +
                                      " points\n        "
                                  ),
                                ]
                              ),
                            ])
                          : n("div", [
                              n("p", { staticClass: "wrapUpWrapper" }, [
                                e._v("\n          Your elo score is "),
                                n("span", { staticClass: "highlight" }, [
                                  e._v(e._s(e.data.endgame.finalElo)),
                                ]),
                              ]),
                            ]),
                      ])
                    : e._e(),
                  e._v(" "),
                  e.data.endgame.replayUrl
                    ? n("p", [
                        e._v("\n      Replay "),
                        n("strong", [
                          n(
                            "a",
                            { attrs: { href: e.data.endgame.replayUrl } },
                            [e._v(e._s(e.data.endgame.replayUrl))]
                          ),
                        ]),
                      ])
                    : e._e(),
                ])
              : n("div", [
                  n("h3", [
                    e._v(
                      "\n      You have just finished a game vs " +
                        e._s(e.data.endgame.opponent.name) +
                        "\n    "
                    ),
                  ]),
                  e._v(" "),
                  e.data.endgame.replayUrl
                    ? n("p", [
                        e._v("\n      Replay "),
                        n("strong", [
                          n(
                            "a",
                            { attrs: { href: e.data.endgame.replayUrl } },
                            [e._v(e._s(e.data.endgame.replayUrl))]
                          ),
                        ]),
                      ])
                    : e._e(),
                ]),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "mask", on: { click: e.close } }, [
            n(
              "div",
              { ref: "menu", staticClass: "menu", style: e.menuStyle },
              [
                e._l(e.data.items, function (t) {
                  return [
                    "challenge" === t.id
                      ? n(
                          "div",
                          { staticClass: "challengeButtonWrapper" },
                          [
                            n("item", {
                              attrs: { data: t },
                              on: { click: e.onItemClick },
                            }),
                          ],
                          1
                        )
                      : e._e(),
                  ];
                }),
                e._v(" "),
                n(
                  "div",
                  { staticClass: "contextMenuItemsWrapper" },
                  [
                    e._l(e.data.items, function (t) {
                      return [
                        "challenge" !== t.id && "separator" !== t.id
                          ? n("item", {
                              attrs: { data: t },
                              on: { click: e.onItemClick },
                            })
                          : e._e(),
                      ];
                    }),
                  ],
                  2
                ),
              ],
              2
            ),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "channelItemWrapper" }, [
            n(
              "div",
              {
                staticClass: "muteChannelItem",
                class: { active: e.data.localUserIsAway },
                attrs: { title: e.muteChannelTitle },
                on: { click: e.onChannelAway },
              },
              [
                n(
                  "svg",
                  {
                    staticClass: "icon",
                    attrs: {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "14",
                      height: "14",
                      viewBox: "0 0 14 14",
                    },
                  },
                  [
                    n("g", [
                      n("path", {
                        attrs: {
                          d: "M2.9 9H1V5h2v3.9l1-1V4.5l3-2.4v2.8l1-1V0L3 4H0v6h1.9zM7 9.1v2.8l-1.6-1.2-.7.7L8 14V8.1zM10.5 5.7c.3.3.5.8.5 1.3 0 1.1-.9 2-2 2v1c1.7 0 3-1.3 3-3 0-.8-.3-1.5-.8-2.1l-.7.8z",
                        },
                      }),
                      e._v(" "),
                      n("path", {
                        attrs: {
                          d: "M9.8 2.1C9.5 2 9.3 2 9 2v.9l.8-.8zM11.9 4.2C12.6 5 13 5.9 13 7c0 2.2-1.8 4-4 4v1c2.8 0 5-2.2 5-5 0-1.3-.5-2.6-1.4-3.5l-.7.7z",
                        },
                      }),
                    ]),
                    e._v(" "),
                    n("path", {
                      staticClass: "icon-strike",
                      attrs: {
                        d: "M12.657.636l.707.707-12.02 12.02-.708-.706z",
                      },
                    }),
                  ]
                ),
              ]
            ),
            e._v(" "),
            n(
              "div",
              {
                staticClass: "leaveChannelItem",
                attrs: { title: "Leave channel" },
                on: { click: e.leaveChannel },
              },
              [
                n(
                  "svg",
                  {
                    staticClass: "icon",
                    attrs: {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "14",
                      height: "14",
                      viewBox: "0 0 14 14",
                    },
                  },
                  [
                    n("path", {
                      attrs: { d: "M9 13H0V2h9v3H8V3H1v9h7v-2h1z" },
                    }),
                    e._v(" "),
                    n("path", {
                      attrs: {
                        d: "M11.2 4.8l-.7.7L12 7H5v1h7.2l-1.7 1.6.7.8L14 7.6z",
                      },
                    }),
                  ]
                ),
              ]
            ),
            e._v(" "),
            n(
              "div",
              {
                staticClass: "channelItem",
                class: { active: e.data.active },
                attrs: { title: e.data.id },
                on: {
                  mouseover: e.showTooltip,
                  mouseleave: e.hideTooltip,
                  click: e.select,
                },
              },
              [
                n("div", { staticClass: "channelItemName" }, [
                  e._v("\n      " + e._s(e.truncatedGameId) + "\n    "),
                ]),
                e._v(" "),
                n("div", { staticClass: "notificationsIndicatorsWrapper" }, [
                  n("div", { staticClass: "notificationsIndicators" }, [
                    n("div", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: e.data.unseenMessages.length > 0,
                          expression: "data.unseenMessages.length > 0",
                        },
                      ],
                      staticClass: "newMessages",
                    }),
                    e._v(" "),
                    n("div", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: e.data.unseenMentions.length > 0,
                          expression: "data.unseenMentions.length > 0",
                        },
                      ],
                      staticClass: "newMentions",
                    }),
                    e._v(" "),
                    n("div", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: e.data.unseenChallenges.length > 0,
                          expression: "data.unseenChallenges.length > 0",
                        },
                      ],
                      staticClass: "newChallenges",
                    }),
                  ]),
                ]),
                e._v(" "),
                n("div", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !0,
                      expression: "true",
                    },
                  ],
                  ref: "tooltip",
                  staticClass: "tooltip",
                }),
              ]
            ),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "message", class: e.data.type }, [
            n("div", { staticClass: "challengeContainer" }, [
              n("div", { staticClass: "title" }, [
                n(
                  "span",
                  { staticClass: "wrapUpWrapper", class: e.data.state },
                  [e._v("\n        " + e._s(e.message) + "\n      ")]
                ),
              ]),
              e._v(" "),
              "active" === e.data.state
                ? n(
                    "div",
                    {
                      staticClass: "cancel-challenge",
                      on: { click: e.cancelChallenge },
                    },
                    [e._v("Cancel")]
                  )
                : e._e(),
            ]),
          ]);
        },
        staticRenderFns: [],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            { staticClass: "motd" },
            [
              e._l(e.data.lines, function (t, a) {
                return [
                  n(
                    "div",
                    { ref: "line_" + a, refInFor: !0, staticClass: "line" },
                    [
                      n(
                        "div",
                        { staticClass: "blocksContainer" },
                        e._l(t.blocks, function (t, s) {
                          return n("div", { staticClass: "blocks" }, [
                            n("span", {
                              ref: "block_" + a + "_" + s,
                              refInFor: !0,
                              class: t.class,
                              domProps: { innerHTML: e._s(t.text) },
                              on: {
                                click: function (n) {
                                  return e.onLineBlockClick(t);
                                },
                              },
                            }),
                          ]);
                        }),
                        0
                      ),
                    ]
                  ),
                ];
              }),
              e._v(" "),
              e.data.events && e.data.events.length > 0
                ? n("div", { staticClass: "line" }, [e._m(0)])
                : e._e(),
              e._v(" "),
              e.data.events && e.data.events.length > 0
                ? n("div", { staticClass: "line" }, [
                    n(
                      "div",
                      { staticClass: "eventsGrid" },
                      [
                        e._l(e.data.events, function (t) {
                          return n(
                            "div",
                            {
                              ref: t.name,
                              refInFor: !0,
                              staticClass: "eventsItem",
                              attrs: { title: t.image },
                            },
                            [
                              n("div", {
                                directives: [
                                  {
                                    name: "lazy",
                                    rawName: "v-lazy:background-image",
                                    value: e.eventThumbnail(t),
                                    expression: "eventThumbnail(event)",
                                    arg: "background-image",
                                  },
                                ],
                                staticClass: "thumbnail",
                              }),
                              e._v(" "),
                              n("div", { staticClass: "name" }, [
                                e._v(e._s(e.eventInfo(t))),
                              ]),
                              e._v(" "),
                              n("div", { staticClass: "system" }, [
                                e._v(e._s(e.eventDate(t))),
                              ]),
                              e._v(" "),
                              n("div", { staticClass: "eventActions" }, [
                                n(
                                  "a",
                                  {
                                    staticClass: "button-generic linkButton",
                                    attrs: { title: e.infoButtonTitle(t) },
                                    on: {
                                      click: function (n) {
                                        return e.infoButtonClicked(t);
                                      },
                                    },
                                  },
                                  [e._v("\n              Info\n            ")]
                                ),
                                e._v(" "),
                                e.streamButtonIsAvailable(t)
                                  ? n(
                                      "a",
                                      {
                                        staticClass:
                                          "button-generic linkButton",
                                        attrs: {
                                          title: e.streamButtonTitle(t),
                                        },
                                        on: {
                                          click: function (n) {
                                            return e.streamButtonClicked(t);
                                          },
                                        },
                                      },
                                      [
                                        e._v(
                                          "\n              Stream\n            "
                                        ),
                                      ]
                                    )
                                  : e._e(),
                              ]),
                            ]
                          );
                        }),
                      ],
                      2
                    ),
                  ])
                : e._e(),
            ],
            2
          );
        },
        staticRenderFns: [
          function () {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n("div", { staticClass: "blocksContainer" }, [
              n("div", { staticClass: "blocks" }, [
                n("br"),
                e._v(" "),
                n("div", { staticClass: "highlight" }, [
                  e._v("\n          EVENTS\n        "),
                ]),
              ]),
            ]);
          },
        ],
      };
    },
    function (e, t) {
      e.exports = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "categoryPreviewWrapper" }, [
            n(
              "div",
              {
                directives: [
                  {
                    name: "lazy",
                    rawName: "v-lazy:background-image",
                    value: e.thumbnailBg(e.category),
                    expression: "thumbnailBg(category)",
                    arg: "background-image",
                  },
                ],
                staticClass: "thumbnail",
              },
              [
                "My Favorites" === e.category
                  ? n("div", { staticClass: "favorite" }, [
                      e._v("\n      ★\n    "),
                    ])
                  : e._e(),
                e._v(" "),
                n("div", { staticClass: "categoryInfoWrapper" }, [
                  n("div", { staticClass: "name" }, [e._v(e._s(e.category))]),
                ]),
              ]
            ),
            e._v(" "),
            n("div", { staticClass: "categoryActions" }, [
              n(
                "a",
                {
                  staticClass: "button-generic browseButton",
                  on: {
                    click: function (t) {
                      return e.searchCategory(e.category);
                    },
                  },
                },
                [e._v("\n      Browse\n    ")]
              ),
            ]),
          ]);
        },
        staticRenderFns: [],
      };
    },
    ,
    ,
    function (e, t) {},
    function (e, t) {},
  ],
  [59]
);
//# sourceMappingURL=app.c46c3a02a4f21f51373d.js.map
