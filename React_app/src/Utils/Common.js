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
    else if (search_type === "list_users") {
        search_form.push(
            <Col span={8} key="UserInput">
                <Form.Item
                    name={"user"}
                    label={"User"}
                    rules={[
                        {
                            required: true,
                            message: 'Input username!',
                        },
                    ]}
                >
                    <Input placeholder="Input Valid user name" />
                </Form.Item>
            </Col>)
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

const  default_user_picture = "data:image/jpeg;base64,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"

export { displayAlert, get_search_form, default_user_picture };

