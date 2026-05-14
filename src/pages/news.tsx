import {
  Box,
  Chip,
  Collapse,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import React, { useState, useMemo } from 'react'
import Layout from '../layout'
import { categories, newsItems, NewsItem } from '../data/newsData'
import * as styles from '../scss/news.module.scss'

export default () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: NewsItem['category']) => {
    const colors: Record<string, string> = {
      'tax-update': '#2196f3',
      deadline: '#f44336',
      tip: '#4caf50',
      announcement: '#ff9800'
    }
    return colors[category] || '#757575'
  }

  return (
    <Layout>
      <Box className={styles.newsPage}>
        <Box className={styles.heroSection}>
          <Typography variant='h3' className={styles.heroTitle}>
            News & Updates
          </Typography>
          <Typography variant='h6' className={styles.heroSubtitle}>
            Stay informed with the latest tax updates, deadlines, and expert
            advice
          </Typography>
        </Box>

        <Box className={styles.controlsSection}>
          <TextField
            placeholder='Search news...'
            variant='outlined'
            size='small'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchField}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon color='action' />
                </InputAdornment>
              )
            }}
          />

          <Box className={styles.categoryFilters}>
            {categories.map((cat) => (
              <Chip
                key={cat.key}
                label={cat.label}
                onClick={() => setActiveCategory(cat.key)}
                variant={activeCategory === cat.key ? 'filled' : 'outlined'}
                color={activeCategory === cat.key ? 'primary' : 'default'}
                className={styles.categoryChip}
              />
            ))}
          </Box>
        </Box>

        <Box className={styles.newsGrid}>
          {filteredNews.length === 0 ? (
            <Box className={styles.emptyState}>
              <Typography variant='h6' color='textSecondary'>
                No updates found matching your criteria
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Try adjusting your search or filter selection
              </Typography>
            </Box>
          ) : (
            filteredNews.map((item, index) => (
              <Paper
                key={item.id}
                className={`${styles.newsCard} ${item.important ? styles.important : ''}`}
                elevation={expandedId === item.id ? 6 : 2}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <Box className={styles.cardHeader}>
                  <Box className={styles.iconWrapper}>
                    <span className={styles.emoji}>{item.icon}</span>
                  </Box>
                  <Box className={styles.cardMeta}>
                    <Chip
                      label={
                        categories.find((c) => c.key === item.category)?.label
                      }
                      size='small'
                      sx={{
                        backgroundColor: getCategoryColor(item.category),
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }}
                    />
                    <Typography variant='caption' className={styles.date}>
                      {formatDate(item.date)}
                    </Typography>
                  </Box>
                  {item.important && (
                    <Box className={styles.importantBadge}>
                      <PriorityHighIcon fontSize='small' />
                    </Box>
                  )}
                </Box>

                <Typography variant='h6' className={styles.cardTitle}>
                  {item.title}
                </Typography>

                <Typography variant='body2' className={styles.cardSummary}>
                  {item.summary}
                </Typography>

                <Collapse in={expandedId === item.id}>
                  <Box className={styles.expandedContent}>
                    <Typography variant='body2'>{item.content}</Typography>
                  </Box>
                </Collapse>

                <Box className={styles.cardActions}>
                  <IconButton
                    onClick={() => handleExpand(item.id)}
                    className={`${styles.expandButton} ${expandedId === item.id ? styles.expanded : ''}`}
                    size='small'
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                  <Typography
                    variant='caption'
                    className={styles.readMoreLabel}
                    onClick={() => handleExpand(item.id)}
                  >
                    {expandedId === item.id ? 'Show less' : 'Read more'}
                  </Typography>
                </Box>
              </Paper>
            ))
          )}
        </Box>
      </Box>
    </Layout>
  )
}
