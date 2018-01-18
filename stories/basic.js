import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Avatar from 'material-ui/Avatar';
import PersonIcon from 'material-ui-icons/Person';
import { ListItem, ListItemText, ListItemIcon, ListItemAvatar } from 'material-ui/List';

import MuiDownshift from '../src';
import StarWarsSelect from './components/StarWarsSelect';
// import StarWarsMultiSelect from './components/StarWarsMultiSelect';

storiesOf('Basic', module)
  .add('defaults (empty)', () => <MuiDownshift />)
  .add('items only', () => <StarWarsSelect />)
  .add('disabled', () => <StarWarsSelect getInputProps={() => ({ disabled: true })} />)
  .add('loading', () => <StarWarsSelect loading />);

storiesOf('Input', module)
  .add('show menu on focus', () => (
    <StarWarsSelect
      getInputProps={({ openMenu }) => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
        onFocus: openMenu,
      })}
      onChange={action('onChange')}
    />
  ))

storiesOf('List item', module)
  .add('default (text only)', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      onChange={action('onChange')}
    />
  ))
  .add('styled text', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      getListItem={({ getItemProps, item }) => (
        <ListItem button {...getItemProps()}>
          <ListItemText primary={<span style={{ color: 'red' }}>{item.text}</span>} />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('left icon', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely'
      })}
      getListItem={({ getItemProps, item }) => (
        <ListItem button {...getItemProps()}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('left avatar', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely'
      })}
      getListItem={({ getItemProps, item }) => (
        <ListItem button {...getItemProps()}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.text} />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('secondary text', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely'
      })}
      getListItem={({ getItemProps, item }) => (
        <ListItem button {...getItemProps()}>
          <ListItemText
            primary={item.text}
            secondary="character"
          />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('variable props', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely'
      })}
      getListItem={({ getItemProps, item, index }) => (
        <ListItem button {...getItemProps()}>
          <ListItemText
            primary={item.text}
            secondary={ index % 2 ? "character" : undefined }
          />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('all', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely'
      })}
      getListItem={({ getItemProps, item, index }) => (
        <ListItem button {...getItemProps()}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.text}
            secondary="character"
          />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('empty list (filtered)', () => (
    <StarWarsSelect
      items={[]}
      showEmpty={true}
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely'
      })}
      getListItem={({ getItemProps, item }) => (
        (item) ? (
          <ListItem button {...getItemProps()}>
            <ListItemText primary={item.text} />
          </ListItem>
        ) : (
          <ListItem button disabled>
            <ListItemText primary={<span style={{ fontStyle: 'italic' }}>No items found</span>} />
          </ListItem>
        )
      )}
      onChange={action('onChange')}
    />
  ))
  .add('long text', () => (
    <StarWarsSelect
      getListItem={({ getItemProps, item, index }) => (
        <ListItem button {...getItemProps()}>
          <ListItemText primary={`${item.text} ${item.text} ${item.text} ${item.text}`} />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('loading footer', () => {
    const loading = true;
    return (
      <MuiDownshift
        items={[
          { text: 'one' },
          { text: 'two' },
          { text: 'three' },
        ]}
        getListItem={({ getItemProps, item }) => (
          (item) ? (
            <ListItem button {...getItemProps()}>
              <ListItemText primary={item.text} />
            </ListItem>
          ) : (
            <ListItem button disabled>
              <ListItemText primary={<span style={{ fontStyle: 'italic' }}>Loading...</span>} />
            </ListItem>
          )
        )}
        includeFooter
        loading={loading}
        isOpen={true}
      />
    )
  })

storiesOf('Menu', module)
  .add('isOpen = true', () => (
    <StarWarsSelect
      isOpen={true}
      onChange={action('onChange')}
    />
  ))
  .add('height by item count (3)', () => (
    <StarWarsSelect
      menuItemCount={3}
      onChange={action('onChange')}
    />
  ))
  .add('height by item count (10)', () => (
    <StarWarsSelect
      menuItemCount={10}
      onChange={action('onChange')}
    />
  ))
  .add('height by pixels (315)', () => (
    <StarWarsSelect
      menuHeight={315}
      onChange={action('onChange')}
    />
  ))

// storiesOf('Multi-select', module)
//   .add('basic', () => (
//     <StarWarsMultiSelect
//       getInputProps={() => ({
//         label: 'Star Wars character',
//         placeholder: 'Choose wisely'
//       })}
//       onChange={action('onChange')}
//     />
//   ))

storiesOf('VirtualList', module)
  .add('static rowHeight (no CellMeasurer)', () => (
    <StarWarsSelect
      getVirtualListProps={() => ({ rowHeight: 48 })}
      onChange={action('onChange')}
    />
  ))
  .add('dynamic rowHeight (no CellMeasurer)', () => (
    <StarWarsSelect
      getListItem={({ getItemProps, item, index }) => (
        <ListItem button {...getItemProps()}>
          <ListItemText
            primary={item.text}
            secondary={ index % 2 ? "character" : undefined }
          />
        </ListItem>
      )}
      getVirtualListProps={() => ({
        rowHeight: ({ index }) => index % 2 ? 72 : 48 
      })}
      onChange={action('onChange')}
    />
  ))

storiesOf('Root', module)
  .add('change z-index of root', () => (
    <div>
      <StarWarsSelect
        menuItemCount={3}
        onChange={action('onChange')}
        getRootProps={() => ({ style: { zIndex: 1 }})}
      />
      <div style={{ willChange: 'transform', background: '#ddd' }}>`will-change: "transform"` set</div>
    </div>
  ))
  .add('overlapping menus', () => (
    <div>
      <StarWarsSelect
        getInputProps={() => ({
          label: 'Star Wars character',
          placeholder: 'Choose wisely'
        })}
        onChange={action('onChange')}
      />
      <StarWarsSelect
        getInputProps={() => ({
          label: 'Star Wars character',
          placeholder: 'Choose wisely'
        })}
        onChange={action('onChange')}
      />
    </div>
  ))