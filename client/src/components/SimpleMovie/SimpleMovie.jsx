import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Grade } from "@mui/icons-material";

import "./SimpleMovie.css";

function SimpleMovie({ title, onClick, plot, imdb, poster }) {
  return (
    <Card
      sx={{
        maxWidth: 290,
        mx: "auto",
        color: "background.paper",
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          // height="250px"
          // width="100px"
          image={poster}
          alt={`Movie's poster`}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
            color="primary"
          >
            {title || ""}
            <Chip
              label={(!!imdb && `imdb: ${imdb.rating}`) || ""}
              icon={<Grade />}
              color="imdb"
              // sx={{ backgroundColor: "imdb" }}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {plot || ""}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

SimpleMovie.propTypes = {
  cast: PropTypes.arrayOf(PropTypes.string),
  genres: PropTypes.arrayOf(PropTypes.string),
  imdb: PropTypes.object,
  onClick: PropTypes.func,
  plot: PropTypes.string,
  poster: PropTypes.string,
  title: PropTypes.string,
};

// SimpleMovie.defaultProps = {
//   cast: ["W/O"],
//   genres: ["W/O"],
//   plot: "",
//   imdb: {},
// };

export default SimpleMovie;
