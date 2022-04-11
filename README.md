## Branch naming conventions

We called our branches with this convention: **mode**/**task**
<br>List of modes:

```angular2html
server
client
common
config
```

For example:

```angular2html
common/socketio-connection
config/dockerize-redis-and-postgres
```

## Installation

```bash
$ yarn install
```

## Workspaces

We use yarn workspaces to separate modules like server, client, common. They are built as different packages which have
names: @synergizer/server, @synergizer/client, @synergizer/common.

## Run scripts

If you want to run npm scripts in different packages from the root you should use:

```bash
$ yarn workspace_name name_of_the script
```

For example:

```bash
$ yarn server start:dev
```

To start the server in the watch mode. Now, it's not recommended to use explicit call of npm scripts, use webstorm
instead.

## Webstorm

By default we use webstorm "Run configuration" to simply run tests, build packages and start something. It's legal to
share you run configurations between other developers in commits.
