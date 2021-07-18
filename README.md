# Tod cli

## Install

### Requirements

Tod is writted in JavaScript and you need to NodeJs, NPM or Yarn and GIT

### Global install

Global installation with npm

```bash
npm install -g tod-cli
```

Glocal installation with yarn

```bash
yarn global add tod-cli
```

### Has project dependencies

Installation with npm

```bash
npm install --save-dev tod-cli
```

Installation with yarn

```bash
yarn add --dev tod-cli
```

Then you need to edit your package.json to add new script

```JSON
{
  "scripts": {
    "tod": "tod"
  }
}
```

and now you can execute tod commande from your prefered tool

## Main concepts

TOD is currently higly dependent about GIT. You will see frequently in the documentation some words like context or identifier.

In the GIT project TOD associate a branch as context. Then if you change your current branch your are changing your current TOD's context.

All system store file in idependants file to avoid merge difficultes in a GIT project. When we are talking about identifier, it refer to the file name. This file name is an SHA1 string to avoid file conlision names and like GIT, you dont need to add the entire identifier to identify the task you want modify or delete.


## Commands


### init - project kickstart
```bash
tod init
```
Init tod project by create the project's folder architecture.


### add - create a new todo
```bash
tod add [options] <description...>
```
By default the new todo is created into current context. By passing the option -b or --backlog, the new todo will be created into the backlog.


### x - mark task as complete
```bash
tod x <identifier>
```
Is not possible to mark as complet a backlog task. Only contextualised task should be mark as complete.


### rm - Delete task
```bash
tod rm [options] <identifier>
```
By default rm try to delete into the current context. By passing the option -b or --backlog, tod will try to delete the task from the backlog.


### mv - move a task from Baklog to current context.
```bash
tod mv [options] <identifier>
```
With the option -b or --backlog, is it possible to move a task from the current context to the backlog.

### resolve - close a context
```bash
tod resolve <context>
```
Delete all task off this context and delete the context folder.



