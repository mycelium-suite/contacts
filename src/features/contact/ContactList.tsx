import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { namedNode } from '@rdfjs/data-model';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

const QueryEngine = require('@comunica/query-sparql-link-traversal').QueryEngine;
const { PathFactory, defaultHandlers } = require('ldflex');
const { default: ComunicaEngine } = require('@ldflex/comunica');
const { default: defaultIterationHandlers } = require('@ldflex/async-iteration-handlers');

interface Contact {
  name: string;
  tel: string;
}

export default function ContactList() {

  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getContacts = async() => {
    const comunica = new QueryEngine();
    const session = getDefaultSession();
    const webId = session.info.webId;

    const queryEngine = new ComunicaEngine(webId, { 
      engine: comunica,
      options: {
          '@comunica/actor-http-inrupt-solid-client-authn:session': getDefaultSession(),
          lenient: true,
          sources: [webId]
      } 
    });

    const pathFactory = new PathFactory({
        context: {
          "foaf": "http://xmlns.com/foaf/0.1/",
          "solid": "http://www.w3.org/ns/solid/terms#",
          "vcard": "http://www.w3.org/2006/vcard/ns#",
          "friends": "foaf:knows",
          "name": "foaf:name",
          "tel": "vcard:tel"
        }, 
        queryEngine,
        handlers: {
          ...defaultHandlers,
          ...defaultIterationHandlers
        }
    });

    //const subject = options?.subject? options.subject: namedNode(sources[0]);
    const path = pathFactory.create({ subject: namedNode(webId!) });
    console.log(webId)

    let local = []

    for await (const friend of path.friends) {
      local.push({
        name: `${await friend.name}`,
        tel: `${await friend.tel}`
      });
    }
    setContacts(local)
  }

  useEffect(() => {
    if (getDefaultSession().info.isLoggedIn)
      getContacts();
  }, []);

  return (
    <Container>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {contacts.map((contact: Contact, index: number) => {
          const labelId = `checkbox-list-secondary-label-${index}`;
          return (
            <ListItem
              key={index}
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={contact.name}
                    src={`${contact.name}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={<Link to={contact.tel}>{contact.name}</Link>} secondary={contact.tel} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Fab 
        color="primary" 
        aria-label="add"
        onClick={() => navigate("/new")}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}
