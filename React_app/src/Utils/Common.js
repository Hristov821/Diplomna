import React from 'react';
import { Alert } from 'antd';

import { Col, Select, Form, Input } from 'antd';

const displayAlert = (display_alert, callback) => {
    if (display_alert.display === true) {
        return (<Alert
            message={display_alert.display_type}
            description={display_alert.display_msg}
            type={display_alert.display_type}
            closable
            onClose={() => { callback({ 'display': false }) }}
        />)
    }
}

const get_search_form = (search_type) => {
    const search_form = [];

    if (search_type === "movie") {
        search_form.push(
            <Col span={8} key="MovieInput">
                <Form.Item
                    name={"movie"}
                    label={"Movie"}
                    rules={[
                        {
                            required: true,
                            message: 'Input something!',
                        },
                    ]}
                >
                    <Input placeholder="Input Valid movie name" />
                </Form.Item>
                <Form.Item
                    name="categories"
                    label="categories"
                    rules={[
                        { type: 'array', required: false, message: "Select desired categories" },
                    ]}
                >
                    <Select mode="multiple" options={movie_categories} />
                </Form.Item>
            </Col>)
    }
    else if (search_type === "actor") {
    }
    else {
    }

    return search_form
}

const movie_categories = [
    {
        value: "Action & Adventure",
        label: "Action & Adventure"
    },
    {
        value: "Anime Features",
        label: "Anime Features"
    },
    {
        value: "Children & Family Movies",
        label: "Children & Family Movies"
    },
    {
        value: "Classic Movies",
        label: "Classic Movies"
    },
    {
        value: "Horror Movies",
        label: "Horror Movies"
    },
    {
        value: "International Movies",
        label: "International Movies"
    },
    {
        value: "Sci-Fi & Fantasy",
        label: "Sci-Fi & Fantasy"
    },
    {
        value: "Comedies",
        label: "Comedies"
    },
    {
        value: "Dramas",
        label: "Dramas"
    },
    {
        value: "Independent Movies",
        label: "Independent Movies"
    },
    {
        value: "Cult Movies",
        label: "Cult Movies"
    },
    {
        value: "Music & Musicals",
        label: "Music & Musicals"
    },
    {
        value: "Romantic Movies",
        label: "Romantic Movies"
    },
    {
        value: "Documentaries",
        label: "Documentaries"
    },
    {
        value: "Sports Movies",
        label: "Sports Movies"
    },
    {
        value: "Faith & Spirituality",
        label: "Faith & Spirituality"
    },
    {
        value: "Thrillers",
        label: "Thrillers"
    },
    {
        value: "Anime Series",
        label: "Anime Series"
    },
    {
        value: "Crime TV Shows",
        label: "Crime TV Shows"
    },
    {
        value: "International TV Shows",
        label: "International TV Shows"
    },
    {
        value: "TV Thrillers",
        label: "TV Thrillers"
    },
    {
        value: "Romantic TV Shows",
        alue: "Romantic TV Shows"
    },
    {
        value: "TV Horror",
        label: "TV Horror"
    },
    {
        value: "Teen TV Shows",
        label: "Teen TV Shows"
    },
    {
        value: "Kids' TV",
        label: "Kids' TV"
    },
    {
        value: "British TV Shows",
        label: "British TV Shows"
    },
    {
        value: "Classic & Cult TV",
        label: "Classic & Cult TV"
    },
    {
        value: "TV Comedies",
        label: "TV Comedies"
    },
    {
        value: "Docuseries",
        label: "Docuseries"
    },
    {
        value: "TV Dramas",
        label: "TV Dramas"
    },
    {
        value: "Reality TV",
        label: "Reality TV"
    },
    {
        value: "Science & Nature TV",
        label: "Science & Nature TV"
    },
    {
        value: "Stand-Up Comedy & Talk Shows",
        label: "Stand-Up Comedy & Talk Shows"
    },
    {
        value: "TV Action & Adventure",
        label: "TV Action & Adventure"
    },
    {
        value: "TV Sci-Fi & Fantasy",
        label: "TV Sci-Fi & Fantasy"
    },
    {
        value: "LGBTQ Movies",
        label: "LGBTQ Movies"
    },
    {
        value: "Spanish-Language TV Shows",
        label: "Spanish-Language TV Shows"
    },
    {
        value: "TV Mysteries",
        label: "TV Mysteries"
    },
    {
        value: "Korean TV Shows",
        label: "Korean TV Shows"
    },
    {
        value: "Stand-Up Comedy",
        label: "Stand-Up Comedy"
    },
    {
        value: "Movies",
        label: "Movies"
    },
    {
        value: "TV Shows",
        label: "TV Shows"
    }
]
export { displayAlert, get_search_form };